import request from '@/utils/request'

let formData = new FormData();
export function reqLogin(data) {
  formData.append('json', JSON.stringify(data));
  return request({
    url: '/service',
    method: 'post',
    data: formData
  })
}

export function reqLogout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data
  })
}