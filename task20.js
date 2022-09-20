/*Написать функцию, которая принимает на вход URL, например https://www.google.com/doodles/rubiks-cube, и возвращает объект вида:
{
 protocol: “http”,
 hostname: “www.google.com”,
 child: {
  path: “doodles”
  child: {
   rubiks-cube
  }
 }
}
URL может быть любой длины, но формат всегда будет {protocol}://{hostname}/path/path/…/path*/

function parseUrl(str){
  const objUrl = {}

  str = str.split("://")
  objUrl.protocol = str[0]
  str.shift()

  str = str[0].split("/")
  objUrl.hostname = str[0]
  str.shift()

  let child = {path: str[str.length - 1 ]}

  for (let i = str.length - 1; i > 0; i--) {
    child = {path: str[i - 1], child: child}
  }

  objUrl.child = child

  return objUrl
}

console.log(parseUrl("https://www.google.com/doodles/rubiks-cube"));
