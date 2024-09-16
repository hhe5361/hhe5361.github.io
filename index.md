---
layout: default
title: Home
---

# Welcome to My Blog!

공부 기록용의 HHE blog입니다.

### About this Blog

This blog covers a variety of subjects, including:

- **Basic CS study**: OS / NetWork / DataBase etc ..
- **programming study**: AOS / SpringBOOT 개발 공부
- **Artificial Intelligence**: 인공지능 논문 리뷰

### About Me

I'm a Student with a passion for coding. I enjoy sharing knowledge and building projects. Thanks.

- [GitHub](https://github.com/hhe5361)

### My Posts

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}
