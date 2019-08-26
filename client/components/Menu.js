import React from 'react'
import PropTypes from 'prop-types'
import {
  populateMealListThunk,
  clearMealList
} from '../store/reducers/mealListReducer'
import {countMealListThunk} from '../store/reducers/mealCountReducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, CardHeader, withStyles, CardMedia} from '@material-ui/core'
import Pagination from 'material-ui-flat-pagination'
import history from '../history'

const styles = theme => ({
  card: {
    width: 430,
    margin: 40,
    height: 300,
    boxShadow: '0px 0px 4px 0px #444444'
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'black'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    bottom: 0
  },
  pageBar: {
    marginBottom: '1.5rem'
  }
})

class MealList extends React.Component {
  constructor() {
    super()
    this.state = {
      offset: 0
    }
    this.handleNewPage = this.handleNewPage.bind(this)
  }
  componentDidMount() {
    this.props.countMealListThunk()
    const query = this.props.match.params.query
    this.props.populateMealListThunk(query)
  }

  componentWillUnmount() {
    this.props.clearMealList()
  }

  handleNewPage(offset) {
    const query = `limit=10&offset=${offset}`
    history.push(query)
    this.props.populateMealListThunk(query)
  }

  handleClick(offset) {
    this.setState({offset})
  }

  render() {
    const {classes} = this.props
    const displayMeals = []
    Object.keys(this.props.mealList).forEach(mealId =>
      displayMeals.push(this.props.mealList[mealId])
    )
    return (
      <div className="all-menu-items">
        <div className="all-menu-items">
          {displayMeals.map(meal => {
            return (
              <div key={meal.id}>
                <Card className={classes.card}>
                  <Link
                    className={classes.linkStyle}
                    to={`/singlemenu/id=${meal.id}`}
                  >
                    <CardHeader
                      title={meal.name}
                      subheader={`$ ${meal.price}`}
                    />
                    <CardMedia
                      className={classes.media}
                      image={meal.image}
                      alt="meal image"
                    />
                  </Link>
                </Card>
              </div>
            )
          })}
        </div>
        <Pagination
          limit={10}
          offset={this.state.offset}
          total={this.props.mealCount}
          onClick={(e, offset) => {
            this.handleClick(offset)
            this.handleNewPage(offset)
          }}
          className={classes.pageBar}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    mealList: state.mealList,
    mealCount: state.mealCount
  }
}

const mapDispatchToProps = {
  populateMealListThunk,
  clearMealList,
  countMealListThunk
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(MealList)
)

MealList.propTypes = {
  mealList: PropTypes.object
}
