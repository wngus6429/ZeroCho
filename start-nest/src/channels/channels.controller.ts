import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  @Get()
  getAllChannels() {}

  @Post()
  createChannel() {}

  @Get(':name')
  getSpecificChannel() {}

  @Get(':name/chats') // 쿼리스트링
  getChats(@Query() query, @Param() param) {
    // getChat(@Query() query, @Param('id') id, @Param('url') url) {
    console.log(query.perPage, query.page);
    console.log(param.id, param.url);
  }

  @Post(':id/chats')
  postChat(@Body() body: dto) {}

  @Get(':name/members')
  getAllMembers() {}

  @Post(':name/members')
  inviteMembers() {}
}
