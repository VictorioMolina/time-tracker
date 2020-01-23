import React from 'react'
import uuidv4 from 'uuid/v4'
import {
  StyleSheet,
  Platform,
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView
} from 'react-native'

import EditableTimer from './components/EditableTimer'
import ToggleableTimerForm from './components/ToggleableTimerForm'
import { newTimer } from './utils/TimerUtils'

export default class App extends React.Component {
  state = {
    timers: [
      {
        id: uuidv4(),
        title: 'Title',
        project: 'Project',
        elapsed: 0,
        isRunning: false,
      },
    ],
  }

  // Lifecycle method
  componentDidMount() {
    const TIME_INTERVAL = 1000

    this.intervalId = setInterval(() => {
      const { timers } = this.state

      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer

          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed
          }
        })
      })
    }, TIME_INTERVAL)
  }

  // Lifecycle method
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  handleCreateFormSubmit = (timer) => {
    const { timers } = this.state

    this.setState({
      /* Avoid operating directly with the state array
      using JavaScript Spread Syntax. We just have to
      treat states as immutable! */
      timers: [newTimer(timer), ...timers]
    })
  }

  handleRemovePress = (timerId) => {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId)
    })
  }

  handleFormSubmit = (attrs) => {
    const { timers } = this.state

    this.setState({
      timers: timers.map(timer => {
        if (timer.id === attrs.id) {
          const { title, project } = attrs

          return {
            ...timer,
            title,
            project
          }
        }
        return timer
      })
    })
  }

  toggleTimer = (timerId) => {
    this.setState((prevState) => {
      const { timers } = prevState

      return {
        timers: timers.map(timer => {
          const { id, isRunning } = timer

          if (id === timerId) {
            return {
              ...timer,
              isRunning: !isRunning // Toggle the boolean value
            }
          }

          return timer
        })
      }
    })
  }

  render() {
    const { timers } = this.state

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.timerListContainer}
        >
          <ScrollView style={styles.timerList}>
            <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
            {timers.map(
              (t) => (
                <EditableTimer
                  key={t.id} // Property used by React Native
                  {...t} // JSX Magic
                  onFormSubmit={this.handleFormSubmit}
                  onRemovePress={this.handleRemovePress}
                  onStartPress={this.toggleTimer}
                  onStopPress={this.toggleTimer}
                />
              )
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  titleContainer: {
    ...Platform.select({
      android: {
        paddingTop: 24
      },
      ios: {
        paddingTop: 35
      }
    }),
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7Da'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  timerListContainer: {
    flex: 1,
  },
  timerList: {
    paddingBottom: 15,
  }
})
