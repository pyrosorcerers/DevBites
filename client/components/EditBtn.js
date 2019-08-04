import React from 'react'

// expect quanty prop pass down
export default class EditBtn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.quantity
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    let val = event.target.value
    this.setState({quantity: val})
  }

  handleSubmit() {}

  render() {
    return (
      <div>
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
        <button type="button" onClick={e => this.handleSubmit(e)}>
          Edit
        </button>
      </div>
    )
  }
}
