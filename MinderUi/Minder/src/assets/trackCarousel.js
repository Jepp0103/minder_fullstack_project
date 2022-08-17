class TrackCarousel {

  constructor(element, tracks) {
      this.randomTrack = tracks[Math.floor(Math.random() * tracks.length)];

      this.board = element;
      this.trackLiked = /*[[${trackLiked}]]*/ "";
      this.user = /*[[${user}]]*/ "";


      // add first two cards programmatically
      this.push();
      this.push();

      // handle gestures
      this.handle();
  }

  handle() {

      // list all cards
      this.cards = this.board.querySelectorAll('.card');

      // get top card
      this.topCard = this.cards[this.cards.length-1];

      // get next card
      this.nextCard = this.cards[this.cards.length-2];

      // if at least one card is present
      if (this.cards.length > 0) {

          // set default top card position and scale
          this.topCard.style.transform = 'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)';

          // destroy previous Hammer instance, if present
          if (this.hammer) this.hammer.destroy();
          if (this.dislikeHammer) this.dislikeHammer.destroy();
          if (this.likeHammer) this.likeHammer.destroy();


          // listen for tap and pan gestures on top card
          this.hammer = new Hammer(this.topCard);
          this.hammer.add(new Hammer.Tap());
          this.hammer.add(new Hammer.Pan({ position: Hammer.position_ALL, threshold: 0 }));

          // pass events data to custom callbacks
          this.hammer.on('tap', (e) => { this.onTap(e) });
          this.hammer.on('pan', (e) => { this.onPan(e) })
      }
  }

  onTap(e) {

      // get finger position on top card
      let propX = (e.center.x - e.target.getBoundingClientRect().left) / e.target.clientWidth;

      // get degree of Y rotation (+/-15 degrees)
      let rotateY = 15 * (propX < 0.05 ? -1 : 1);

      // change the transition property
      this.topCard.style.transition = 'transform 100ms ease-out';

      // rotate
      this.topCard.style.transform = 'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(' + rotateY + 'deg) scale(1)';

      // wait transition end
      setTimeout(() => {
          // reset transform properties
          this.topCard.style.transform = 'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'
      }, 100)
  }

  onPan(e) {

      if (!this.isPanning) {

          this.isPanning = true;

          // remove transition properties
          this.topCard.style.transition = null;
          if (this.nextCard) this.nextCard.style.transition = null;

          // get top card coordinates in pixels
          let style = window.getComputedStyle(this.topCard);
          let mx = style.transform.match(/^matrix\((.+)\)$/);
          this.startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0;
          this.startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0;

          // get top card bounds
          let bounds = this.topCard.getBoundingClientRect();

          // get finger position on top card, top (1) or bottom (-1)
          this.isDraggingFrom = (e.center.y - bounds.top) > this.topCard.clientHeight / 2 ? -1 : 1

      }

      // calculate new coordinates
      let posX = e.deltaX + this.startPosX;
      let posY = e.deltaY + this.startPosY;

      // get ratio between swiped pixels and the axes
      let propX = e.deltaX / this.board.clientWidth;
      let propY = e.deltaY / this.board.clientHeight;

      // get swipe direction, left (-1) or right (1)
      let dirX = e.deltaX < 0 ? -1 : 1;

      // calculate rotation, between 0 and +/- 45 deg
      let deg = this.isDraggingFrom * dirX * Math.abs(propX) * 45;

      // calculate scale ratio, between 95 and 100 %
      let scale = (95 + (5 * Math.abs(propX))) / 100;

      // move top card
      this.topCard.style.transform = 'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg) rotateY(0deg) scale(1)';

      // scale next card
      if (this.nextCard) this.nextCard.style.transform = 'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(' + scale + ')';

      if (e.isFinal) {

          this.isPanning = false;

          let successful = false;

          // set back transition properties
          this.topCard.style.transition = 'transform 200ms ease-out';
          if (this.nextCard) this.nextCard.style.transition = 'transform 100ms linear';

          // check threshold
          if (propX > 0.25 && e.direction == Hammer.DIRECTION_RIGHT) {
              console.log("To the right....  ");
              this.liked();
              location.reload();
              successful = true;
              // get right border position
              posX = this.board.clientWidth

          } else if (propX < -0.25 && e.direction == Hammer.DIRECTION_LEFT) {
              console.log("To the left....  ");
              this.disliked();
              location.reload();
              successful = true;
              // get left border position
              posX = - (this.board.clientWidth + this.topCard.clientWidth)
          }

          if (successful) {

              // throw card in the chosen direction
              this.topCard.style.transform = 'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)';

              // wait transition end
              setTimeout(() => {
                  // remove swiped card
                  this.board.removeChild(this.topCard);
                  // add new card
                  this.push();
                  // handle gestures on new top card
                  this.handle()
              }, 200)

          } else {

              // reset cards position
              this.topCard.style.transform = 'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'
              if (this.nextCard) this.nextCard.style.transform = 'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(0.95)'

          }
      }
  }


  disliked() {
      const data = {
          "CustomerId": this.user,
          "TrackId": this.randomTrack.TrackId
      };

      $.ajax({
          url: "https://localhost:7151/api/dislikes",
          dataType: "text",
          type: "post",
          contentType: "application/json",
          data: JSON.stringify(data),
          success: function() {
              console.log("Disliking worked")
          },
          error: function() {
              console.log("Disliking didn't work...")
          }
      });
  }

  liked() {
      let data = {
        "CustomerId": this.user,
        "TrackId": this.randomTrack.TrackId
      };
      $.ajax({
          url: "https://localhost:7151/api/likes",
          dataType: "text",
          type: "post",
          contentType: "application/json",
          data: JSON.stringify(data),
          success: function() {
              console.log("Liking worked")
          },
          error: function() {
              console.log("Liking didn't work...")
          }
      });
  }

  push() {
      let card = document.getElementById('card');
      card.classList.add('card');


      //Random track to display
      $("#trackName").text(this.randomTrack.TrackName);
      $("#artistName").text(this.randomTrack.ArtistName);
      $("#albumTitle").text(this.randomTrack.AlbumTitle);
      $("#genreName").text(this.randomTrack.GenreName);

      if (this.board.firstChild) {
          this.board.insertBefore(card, this.board.firstChild)
      } else {
          this.board.append(card)
      }

  }

}
