export const healthCheck = async (req, res) => {
  console.group('Request data:');
  console.log('Request to health check was at - ', new Date().toISOString());

  try {
    res.status(201).json({
      success: true,
      message: 'Success!'
    });
  } catch (error) {
    console.log('Something went wrong: ', error);
    res.status(500).json({success: false, message: error});
  }

  console.groupEnd();
};