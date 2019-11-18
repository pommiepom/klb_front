import $ from 'jquery';
import Reflect from './reflect';
import API from './api'

const config = {
	headers: {
		'Content-Type': 'multipart/form-data',
		jwt: localStorage.getItem('jwt')
	}
};

const addFile = (post_id) => {

	return new Promise((resolve, reject) => {

		const files = $('#file').prop('files');

		if (files.length > 0) {
			API.get(`/posts/${post_id}/filenum`)
				.then(res => {
					const filenum = res.data.filenum

					if (filenum + files.length < 6) {
						const promises = []

						for (let i = 0; i < files.length; i++) {
							const formData = new FormData();
							formData.append('file', files[i])
							promises.push(API.patch(`/posts/${post_id}/file`, formData, config))
						}

						Promise.all(promises.map(Reflect))
							.then(doc => {
								resolve(doc)
							})
							.catch(err => {
								reject(err)
							})
					} else {
						reject("can't upload over 5 files")
					}
				})
				.catch(err => {
					reject(err)
				})
		}
		else{
			resolve('no file')
		}
	})
}

export default addFile