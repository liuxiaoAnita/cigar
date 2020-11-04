import request from '@/utils/request'

export function reqLogin(data) {
  const formData = new FormData();
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