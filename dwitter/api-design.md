## Dwitter Apis

//
유저 스키마

```
user
{
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  url: string (optional);
}
```

//
회원가입

POST /auth/signup

```
user
```

response

```
{
  token,
  username
}
```

//
로그인
POST /auth/login

```
{
  username,
  password
}
```

response

```
{
  token
  username
}
```

//
GET /auth/me

response

```
  {
    token,
    username
  }
```

//
드위터 스키마

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
GET /tweets
params x : 모든
params ?username=name : 특정 유저

response

```
모든 드윗
{
  [tweet, tweet, ...]
}

특정 유저의 드윗
{
  tweet
}
```

//

드윗 작성하기
POST /tweet

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
PUT /tweet/:id

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
DELETE /tweet/:id

response
204
