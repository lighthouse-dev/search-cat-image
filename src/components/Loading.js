class Loading {
  isLoading = false;

  constructor({ $target, data }) {
    const $loadingElem = document.createElement('div');
    $loadingElem.className = 'loading';
    this.loading = $loadingElem;
    $target.appendChild($loadingElem);
    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.isLoading = nextData ? true : false;
    this.render();
  }

  render() {
    if (this.isLoading) {
      this.loading.innerHTML = `
        <div class="loading">
          Loading...
        </div>`;
      this.loading.style.display = 'block';
    } else {
      this.loading.style.display = 'none';
    }
  }
}

export default Loading;
