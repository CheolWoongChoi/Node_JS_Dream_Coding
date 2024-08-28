## Dwitter Apis

Dwitter Scheme

```
id: number;
text: string;
createdAt: string | Date;
name: string;
username: string;
url: string (optional)
```

//

모든 드윗 가져오기
GET /dweets
params x : 모든
params ?username=name : 특정 유저

response

```
모든 드윗
{
  [dweet, dweet, ...]
}

특정 유저의 드윗
{
  dweet
}
```

//

드윗 작성하기
POST /dweet

body

```
{
  nickname: string
  contents: string
}
```

response
201 created

//

드윗 수정하기
PUT /dweet/:id

```
body
{
  nickname: string
  contents: string
}
```

response
204

//

드윗 삭제하기
DELETE /dweet/:id

response
204
