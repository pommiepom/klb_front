import $ from 'jquery';
import Reflect from './reflect';
import API from './api'

const addFile = (post_id) => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
			jwt: localStorage.getItem('jwt')
		}
	};

	const files = $('#file').prop('files');

	if (files.length > 0) {
		API.get(`/posts/${post_id}/filenum`)
			.then(res => {
				const filenum = res.data.filenum
				// console.log('count ', filenum + files.length);
				if (filenum + files.length < 6) {
					const promises = []

					for (let i = 0; i < files.length; i++) {
						const formData = new FormData();
						formData.append('file', files[i])
						promises.push(API.patch(`/posts/${post_id}/file`, formData, config))
					}

					Promise.all(promises.map(Reflect))
						.then(doc => {
							console.log(doc);
						})
						.catch(err => {
							console.error(err);
						})
				} else {
					console.log("can't upload over 5 files");
				}
			})
			.catch(err => {
				console.log(err);
			})
	}
}

export default addFile