import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import ImageInfo from './ImageInfo.js';
import Loading from './components/Loading.js';
import api from './api.js';
import { getStorage } from './utils/localStorage.js';

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        // Loading UI 표시
        this.isLoading.setState(true);

        // 검색 시 키워드를 로컬스토리지에 저장
        const historyList = getStorage().getItem('searchHistory') || [];
        historyList.push(keyword);
        getStorage().setItem('searchHistory', JSON.stringify(historyList));

        api
          .fetchCats(keyword)
          .then(({ data }) => {
            data && this.setState(data);
          })
          .finally(() => {
            this.isLoading.setState(false);
          });
      }
    });

    this.isLoading = new Loading({ $target, data: this.data.length });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.setState({
          visible: true,
          image
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}

export default App;
