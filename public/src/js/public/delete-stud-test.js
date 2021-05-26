document.querySelectorAll('.delete-stud-test').forEach(btn => {
  btn.onclick = () => {
    fetch('/teacher-lk/deletecomtest', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        testId: btn.dataset.idTest,
        studenId: btn.dataset.idStudent
      })
    }).then(() => location.reload());
  }
})