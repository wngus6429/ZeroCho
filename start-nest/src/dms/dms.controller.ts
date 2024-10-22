import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('api/workspaces/:url/dms') // 라우트파라미터
export class DmsController {
  @Get(':id/chats') // 쿼리스트링
  getChat(@Query() query, @Param() param) {
    // getChat(@Query() query, @Param('id') id, @Param('url') url) {
    console.log(query.perPage, query.page);
    console.log(param.id, param.url);
  }

  @Post(':id/chats')
  postChat(@Body() body: dto) {}
}

// 라우트 파라미터와 쿼리 스트링은 URL에서 데이터를 전달하는 방식으로, 각각의 특징과 용도가 다릅니다. 주요 차이점은 다음과 같습니다:

// 1. 라우트 파라미터 (Route Parameters)
// 형식: URL의 경로에 포함되어 데이터를 전달합니다. 예를 들어, /users/123에서 123이 라우트 파라미터입니다.
// 구조: 주로 RESTful API에서 리소스의 식별자(id)나 경로의 일부로 사용됩니다. URL의 경로에 고정된 형태로 포함되기 때문에 명확한 구조를 가집니다.
// 사용 예시:
// /users/:id와 같은 형식으로 정의하고, :id에 해당하는 값이 전달됩니다.
// 예를 들어, /users/123이면 id 파라미터는 123이 됩니다.
// 주로 사용되는 경우:
// 특정 리소스를 조회할 때 (예: 특정 사용자, 글, 상품 등).
// 리소스의 고유 식별자를 전달할 때.

// 2. 쿼리 스트링 (Query String)
// 형식: URL의 끝에 ?를 사용해 키-값 쌍으로 데이터를 전달합니다. 예를 들어, /search?query=react&page=2에서 query=react와 page=2가 쿼리 스트링입니다.
// 구조: ?key1=value1&key2=value2 형태로 여러 파라미터를 전달할 수 있으며, 각 파라미터는 &로 구분됩니다.
// 사용 예시:
// /search?query=react&page=2는 query 파라미터에 react, page 파라미터에 2 값을 전달합니다.
// 주로 사용되는 경우:
// 필터링, 정렬, 검색 같은 다양한 옵션을 전달할 때.
// 선택적이고 여러 개의 파라미터를 사용할 때.
