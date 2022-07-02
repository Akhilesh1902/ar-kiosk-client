export class VideoUtil {
  constructor(_video, c1, c2, tol) {
    this.video = _video;
    this.c1 = c1;
    this.color = {};
    this.ctx1 = this.c1.getContext('2d');
    this.c2 = c2;
    this.ctx2 = this.c2.getContext('2d');

    this.tolerance = tol;

    let self = this;
    this.video.addEventListener('play', () => {
      //   self.width = self.video.videoWidth;
      self.width = self.video.getBoundingClientRect().width;
      //   self.height = self.video.videoHeight;
      self.height = self.video.getBoundingClientRect().height;
      self.timerCallback();
      self.setDimentions();
    });
  }

  setDimentions() {
    this.c1.width = this.width;
    this.c1.height = this.height;
    this.c2.width = this.width;
    this.c2.height = this.height;
  }

  timerCallback() {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    let self = this;
    setTimeout(() => {
      self.timerCallback();
    }, 1000 / 20);
  }

  changeColor(color) {
    this.color = color;
    // console.log(this.color.r);
    console.log(this.color);
  }

  computeFrame() {
    // console.log(this.width, this.height);

    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
    let data = frame.data;
    const l = data.length / 4;
    // console.log(this.color);

    for (let i = 0; i < l * 4; i++) {
      let diff =
        Math.abs(data[i] - data[0]) +
        Math.abs(data[i + 1] - data[1]) +
        Math.abs(data[i + 2] - data[2]);
      // console.log(diff);

      if (diff < this.tolerance) {
        data[i + 3] = 0;
      }

      // let r = frame.data[i * 4 + 0];
      // let g = frame.data[i * 4 + 1];
      // let b = frame.data[i * 4 + 2];
      // if (g > this.color.g && r < this.color.r && b < this.color.b) {
      //   frame.data[i * 4 + 3] = 0;
      // }
    }
    this.ctx2.putImageData(frame, 0, 0);
  }
}
