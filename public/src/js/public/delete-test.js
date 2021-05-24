document.querySelectorAll('.delet__test').forEach( del => {
  let id = del.dataset.id;
  del.onclick = () => {
    fetch('/teacher-lk/deletetest', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        testId: id
      })
    }).then(() => location.reload());
  }
 
})