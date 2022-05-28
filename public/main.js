var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
  // turn node list into array
      element.addEventListener('click', function(){
        //add event listener to each traschcan
        const name = this.parentNode.parentNode.childNodes[1].innerText
        //grab the name
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        // grab the message
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(thumbDown).forEach(function(element) {
  // turn node list into array
      element.addEventListener('click', function(){
        //add event listener to each traschcan
        const name = this.parentNode.parentNode.childNodes[1].innerText
        //grab the name
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        // grab the message
        const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messagesDown', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbDown
            // calling on the same property with a different value
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        //parentnode parentnode goes from the span to the li so we can grab the name. index one is the name, index 3 is the message.
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        //grab th message
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
