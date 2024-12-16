let interval = null;

export const refreshServer = async (req, res) => {
  console.group('Request data:');
  console.log('Request from down-time-resolver was at ', new Date().toISOString());

  try {
    interval = setTimeout(async () => {
      await fetch('https://down-time-resolver.onrender.com/api/v1/refresh');

      console.log('Request to down-time-resolver was at ', new Date().toISOString());

      console.groupEnd();
    }, 1000*5);

    res.status(201).json({success: true, message: 'Success! down-time-resolver.onrender.com will be updated after 5sec'});
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
};