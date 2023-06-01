connection.end((err) => {
    if (err) throw err;
    console.log('Disconnected from the database!');
  });