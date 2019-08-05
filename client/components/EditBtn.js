import React from 'react'

// expect quantity prop pass down
// expect handleEdit function prop pass down
// expect mealId and orderId props pass down
export default class EditBtn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.quantity
    }
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    let val = event.target.value
    this.setState({quantity: val})
  }

  render() {
    const {mealId, orderId} = this.props
    return (
      <div>
        <label>
          Quantity:
          <select
            onChange={event => this.handleChange(event)}
            value={this.state.quantity}
          >
            {Array(5)
              .fill(1)
              .map((val, i) => {
                return (
                  <option value={val + i} key={val + i}>
                    {val + i}
                  </option>
                )
              })}
          </select>
          <button
            type="button"
            onClick={() =>
              this.props.handleEdit(mealId, orderId, this.state.quantity)
            }
          >
            Edit
          </button>
        </label>
      </div>
    )
  }
}
