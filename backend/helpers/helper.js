// success message
exports.sendSuccess = (res, data = {}, errors = {},message = 'Success') => {
  return res.status(200).json({
    status: true,
    message,
    data: Object.keys(data).length > 0 ? data : {},
    errors: Object.keys(errors).length > 0 ? errors : {}
  });
};

// error message
exports.sendError = (res,data = {},errors = {}, message = 'Something went wrong', statusCode = 500) => {
  return res.status(statusCode).json({
    status: false,
    message,
    data: Object.keys(data).length > 0 ? data : {},
    errors: Object.keys(errors).length > 0 ? errors : {}
  });
};
