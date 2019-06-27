import Http from './http'

export default class Base {
  static get = Http.get.bind(Http)
  static put = Http.put.bind(Http) 
  static post = Http.post.bind(Http)   
  static delete = Http.delete.bind(Http)
}
