import { Component } from 'react'
import { Button } from 'react-bootstrap'
import './Counter.css'

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  increment = () => {
    this.setState((currentState) => ({ count: currentState.count + 1 }))
  }

  decrement = () => {
    this.setState((currentState) => ({
      count: currentState.count > 0 ? currentState.count - 1 : 0,
    }))
  }

  reset = () => {
    this.setState({ count: 0 })
  }

  render() {
    const { count } = this.state

    return (
      <div className="counter-actions d-grid gap-3">
        <div className="counter-value mb-4" aria-live="polite">
          {count}
        </div>
        <Button variant="primary" size="lg" onClick={this.increment}>
          Tăng
        </Button>
        <Button variant="outline-primary" size="lg" onClick={this.decrement} disabled={count === 0}>
          Giảm
        </Button>
        <Button variant="dark" size="lg" onClick={this.reset}>
          Reset
        </Button>
      </div>
    )
  }
}

export default Counter