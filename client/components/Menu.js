import React from 'react'
import PropTypes from 'prop-types'
import {getMealsThunk} from '../store/meals'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, CardHeader, withStyles, CardMedia} from '@material-ui/core'
import {flexbox, fontSize} from '@material-ui/system'
import shadows from '@material-ui/core/styles/shadows'

const styles = theme => ({
  card: {
    width: 430,
    margin: 40,
    height: 300,
    boxShadow: '0px 0px 4px 0px #444444'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    bottom: 0
  }
})

class Menu extends React.Component {
  componentDidMount() {
    this.props.getMeals()
  }

  render() {
    const {classes} = this.props
    const linkStyle = {textDecoration: 'none', color: 'black'}
    return (
      <div className="all-menu-items">
        {this.props.menu.map(meal => {
          return (
            <div key={meal.id}>
              <Card className={classes.card}>
                <Link style={linkStyle} to={`/menu/${meal.id}`}>
                  <CardHeader title={meal.name} subheader={`$ ${meal.price}`} />
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
    )
  }
}

const mapStateToProps = state => {
  return {
    menu: state.meals
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMeals: () => dispatch(getMealsThunk())
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Menu)
)

Menu.propTypes = {
  menu: PropTypes.array
}
