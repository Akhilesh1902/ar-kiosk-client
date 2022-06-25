export class VideoUtil {
  constructor(_video, c1, c2) {
    // console.log(_video);
    // console.log(c1);
    // console.log(c2);
    this.video = _video;
    this.c1 = c1;
    this.ctx1 = this.c1.getContext('2d');
    this.c2 = c2;
    this.ctx2 = this.c2.getContext('2d');
    let self = this;
    this.video.addEventListener('play', () => {
      //   self.width = self.video.videoWidth;
      self.width = self.video.getBoundingClientRect().width;
      //   self.height = self.video.videoHeight;
      self.height = self.video.getBoundingClientRect().height;
      self.timerCallback();
    });
  }

  timerCallback() {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    let self = this;
    setTimeout(() => {
      self.timerCallback();
    }, 1000 / 30);
  }

  computeFrame() {
    // console.log(this.ctx2);
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
    const l = frame.data.length / 4;

    // console.log(frame);
    // console.log(this.ctx1);
    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      // let b = frame.data[i * 4 + 2];
      if (g > 100 && r < 50) {
        frame.data[i * 4 + 3] = 0;
      }
    }
    this.ctx2.putImageData(frame, 0, 0);
  }
}
