import { getStorage } from './utils/localStorage.js';

const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;

    // 페이지를 새로고침해도 마지막 검색 결과 화면이 유지되도록 처리
    this.setSearchInputText();

    $searchInput.className = 'SearchInput';
    $target.appendChild($searchInput);

    $searchInput.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    // 페이지 진입 시 포커스가 input 에 가도록 처리하고,
    // 키워드를 입력한 상태에서 input 을 클릭할 시에는 기존에 입력되어 있던 키워드가 삭제되도록 만들어야 합니다.
    $searchInput.focus();
    $searchInput.addEventListener('focusin', e => {
      $searchInput.value = '';
    });

    console.log('SearchInput created.', this);
  }

  setSearchInputText() {
    const searchHistory = getStorage().getItem('searchHistory');

    if (!searchHistory) {
      this.$searchInput.placeholder = '고양이를 검색해보세요.';
    } else {
      this.$searchInput.value = JSON.parse(searchHistory).pop();
    }
  }

  render() {}
}

export default SearchInput;
