module.exports = {
	success(res, message, code, data) {
		return res.json({
			'success': true,
			'message': message,
			'code': code,
			'data': data
		});
	},

	failure(res, message, code) {
		return res.json({
			'success': false,
			'message': message,
			'code': code
		});
	}
}