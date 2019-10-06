import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store/index'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as types from './redux/constants/actionTypes' //'../../constants/ActionTypes'
import * as actions from './redux/actions/index'//'../../actions/TodoActions'
import rootReducer, { initialState } from './redux/reducers/index'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Header from './components/Header'
import toJson from 'enzyme-to-json';
import { ConnectedForm } from './components/Form'
import { ConnectedList } from './components/List'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('default test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Provider store={store}>
      <App />
    </Provider>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})


describe('state management - redux', () => {
  describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })
    it('should create a FETCH_DATA action when fetching data has been done', () => {
      fetchMock.getOnce('https://swapi.co/api/starships/?search=death', {
        body: {
          results: [{
            name: 'Deathstar',
            model: 'DS-1 Orbital Battle Station',
            length: '120000'
          }
          ]
        }
      })
        .catch(err => {
          throw new Error(err)
        })
      const expectedActions = [
        {
          type: types.DATA_FETCH,
          payload: [{
            name: 'Deathstar',
            model: 'DS-1 Orbital Battle Station',
            length: '120000'
          }
          ]
        }
      ]
      const store = mockStore({ remoteItems: [] })

      return store.dispatch(actions.getData({
        path: 'starships',
        query: 'death'
      })).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(rootReducer(undefined, {})).toEqual(initialState)
    })

    it('should replace remoteItems state with given payload on handle DATA_FETCH', () => {
      expect(
        rootReducer(undefined, {
          type: types.DATA_FETCH,
          payload: {
            test: 'testing'
          }
        })
      ).toEqual(
        {
          ...initialState,
          remoteItems: {
            test: 'testing'
          }
        }
      )
    })
  })
})

describe('React components', () => {
  Enzyme.configure({ adapter: new Adapter() })

  describe('Header', () => {

    function setup() {
      const enzymeWrapper = shallow(<Header />)

      return {
        enzymeWrapper
      }
    }

    it('should render self', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.find('h1').hasClass('title')).toBe(true)

      expect(enzymeWrapper.find('h1').text()).toBe('STARWARS')

      expect(enzymeWrapper.find('p').hasClass('subtitle')).toBe(true)

      expect(enzymeWrapper.find('p').text()).toBe('Search for your favorite star wars vehicles and starships and see their length in meters!')
    })

  })

  describe('Form', () => {
  let enzymeWrapper

   beforeEach(() => {
     enzymeWrapper = shallow(<ConnectedForm />)
   })

  
    it('should render self', () => {
      expect(toJson(enzymeWrapper)).toMatchSnapshot()
    })
  })

  describe('List', () => {
    let enzymeWrapper
  
     beforeEach(() => {
       enzymeWrapper = shallow(<ConnectedList />)
     })
  
    
      it('should render self', () => {
        expect(toJson(enzymeWrapper)).toMatchSnapshot()
      })
    })




})











