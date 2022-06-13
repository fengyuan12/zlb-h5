import { mapState } from 'vuex'
export const UiStyle = {
  computed: {
    ...mapState({
      uiStyle: state => state.uiStyle
    }),
    isNormal() {
      return this.uiStyle === 'normal'
    }
  }
}
