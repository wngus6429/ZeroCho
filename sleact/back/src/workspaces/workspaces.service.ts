import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspaces } from '../entities/Workspaces';
import { Repository } from 'typeorm';
import { Channels } from '../entities/Channels';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { ChannelMembers } from '../entities/ChannelMembers';
import { Users } from '../entities/Users';

@Injectable()
export class WorkspacesService {
  // 상속 받아서 쓸때 Dependency Injection 안되는 문제 해결할려고
  // constructor( 안 쓴거임
  @InjectRepository(Workspaces)
  private workspacesRepository: Repository<Workspaces>;
  @InjectRepository(Channels)
  private channelsRepository: Repository<Channels>;
  @InjectRepository(WorkspaceMembers)
  private workspaceMembersRepository: Repository<WorkspaceMembers>;
  @InjectRepository(ChannelMembers)
  private channelMembersRepository: Repository<ChannelMembers>;
  @InjectRepository(Users)
  private usersRepository: Repository<Users>;

  async findById(id: number) {
    return this.workspacesRepository.findOne({ where: { id } });
  }

  async findMyWorkspaces(myId: number) {
    return this.workspacesRepository.find({
      where: {
        WorkspaceMembers: [{ UserId: myId }],
      },
    });
  }

  async createWorkspace(name: string, url: string, myId: number) {
    const workspace = new Workspaces();
    workspace.name = name;
    workspace.url = url;
    workspace.OwnerId = myId;
    const returned = await this.workspacesRepository.save(workspace);

    const workspaceMember = new WorkspaceMembers();
    workspaceMember.UserId = myId;
    workspaceMember.WorkspaceId = returned.id;
    // await this.workspaceMembersRepository.save(workspaceMember);

    const channel = new Channels();
    channel.name = '일반';
    channel.WorkspaceId = returned.id;
    // const channelReturned = await this.channelsRepository.save(channel);

    const [, channelReturned] = await Promise.all([
      this.workspaceMembersRepository.save(workspaceMember),
      this.channelsRepository.save(channel),
    ]);
    const channelMember = new ChannelMembers();
    channelMember.UserId = myId;
    channelMember.ChannelId = channelReturned.id;
    await this.channelMembersRepository.save(channelMember);
  }

  // 트랜잭션 버젼, 원래 이게 맞음
  // async createWorkspaceMembersTransaction(url: string, email: string) {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     const workspace = await queryRunner.manager.findOne(Workspaces, {
  //       where: { url },
  //       relations: ['Channels'],
  //     });

  //     const user = await queryRunner.manager.findOne(Users, {
  //       where: { email },
  //     });
  //     if (!user) return null;

  //     const workspaceMember = new WorkspaceMembers();
  //     workspaceMember.WorkspaceId = workspace.id;
  //     workspaceMember.UserId = user.id;
  //     await queryRunner.manager.save(workspaceMember);

  //     const channelMember = new ChannelMembers();
  //     channelMember.ChannelId = workspace.Channels.find(
  //       (v) => v.name === '일반',
  //     ).id;
  //     channelMember.UserId = user.id;
  //     await queryRunner.manager.save(channelMember);

  //     await queryRunner.commitTransaction();
  //   } catch (error) {
  //     console.error(error);
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  // 쿼리빌더, SQL 느낌을 살려준다
  async getWorkspaceMembers(url: string) {
    return (
      this.usersRepository
        .createQueryBuilder('user')
        .innerJoin('user.WorkspaceMembers', 'members')
        // SQL Injection 방지
        .innerJoin('members.Workspace', 'workspace', 'workspace.url = :url', {
          url,
        })
        .getMany()
      // ID, Email, Password, Workspace.Name, Workspace.Url -> getMany() 가 객체로 만들어줌
    );
  }

  // 워크스페이스에 사람 초대
  async createWorkspaceMembers(url, email) {
    // 워크스페이스 찾기
    const workspace = await this.workspacesRepository.findOne({
      where: { url },
      // relations: ['Channels'], // 아래와 같은 의미
      join: {
        alias: 'workspace',
        innerJoinAndSelect: {
          channels: 'workspace.Channels',
        },
      },
    });
    // this.workspacesRepository.createQueryBuilder('workspace').innerJoinAndSelect('workspace.Channels', 'channels').getOne();
    // 제로초는 쿼리빌더 많이 쓴대. 복잡한것도 쉽게 표현 할수 있어서
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const workspaceMember = new WorkspaceMembers();
    workspaceMember.WorkspaceId = workspace.id;
    workspaceMember.UserId = user.id;
    await this.workspaceMembersRepository.save(workspaceMember);
    const channelMember = new ChannelMembers();
    channelMember.ChannelId = workspace.Channels.find(
      (v) => v.name === '일반',
    ).id;
    channelMember.UserId = user.id;
    await this.channelMembersRepository.save(channelMember);
  }

  // 워크스페이스에 있는 멤버들 가져오기
  async getWorkspaceMember(url: string, id: number) {
    // this.usersRepository
    //   .createQueryBuilder('u')
    //   .insert()
    //   .into(Users)
    //   .values(new Users())
    //   .execute();
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .innerJoin('user.Workspaces', 'workspaces', 'workspaces.url = :url', {
        url,
      })
      .getOne();
  }
}
