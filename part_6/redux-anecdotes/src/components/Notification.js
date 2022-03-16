import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log(props.notification)
  return (
    <div>
      {
        props.notification !== '' && (
          <div style={style}>
            {props.notification}
          </div>
        )
      }
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)