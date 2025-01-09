let timer = null;

export const refreshServer = async (req, res) => {
  console.group('Request data:');
  console.log('Request from down-time-resolver - ', new Date().toISOString());

  try {
    timer = setTimeout(async () => {
      await fetch('https://down-time-resolver.onrender.com/api/v1/refresh');
      console.log('Request to down-time-resolver - ', new Date().toISOString());
    }, 1000 * 5);

    res.status(201).json({
      success: true,
      message: 'Success! down-time-resolver.onrender.com will be updated after 5sec'
    });
  } catch (error) {
    console.log('Something went wrong: ', error);
    clearTimeout(timer);
    res.status(500).json({success: false, message: error});
  }

  console.groupEnd();
};