import React from 'react'
import PropTypes from 'prop-types'

import TimerForm from './TimerForm'
import Timer from './Timer'

export default class EditableTimer extends React.Component {
    state = {
        editFormOpen: false
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        project: PropTypes.string.isRequired,
        elapsed: PropTypes.number.isRequired,
        isRunning: PropTypes.bool.isRequired,
        onFormSubmit: PropTypes.func.isRequired,
        onRemovePress: PropTypes.func.isRequired,
        onStartPress: PropTypes.func.isRequired,
        onStopPress: PropTypes.func.isRequired,
    }

    handleEditPress = () => {
        this.openForm()
    }

    handleFormClose = () => {
        this.closeForm()
    }

    handleSubmit = (timer) => {
        const { onFormSubmit } = this.props

        onFormSubmit(timer)
        this.closeForm()
    }

    closeForm = () => {
        this.setState({ editFormOpen: false })
    }

    openForm = () => {
        this.setState({ editFormOpen: true })
    }

    render() {
        const {
            id,
            title,
            project,
            elapsed,
            isRunning,
            onRemovePress,
            onStartPress,
            onStopPress
        } = this.props

        const { editFormOpen } = this.state

        // If we want to edit the timer...
        if (editFormOpen) {
            // we render TimerForm
            return (
                <TimerForm
                    id={id}
                    title={title}
                    project={project}
                    onFormSubmit={this.handleSubmit}
                    onFormClose={this.handleFormClose}
                />
            )
        }

        // Otherwise, we render Timer
        return (
            <Timer
                id={id}
                title={title}
                project={project}
                elapsed={elapsed}
                isRunning={isRunning}
                onEditPress={this.handleEditPress}
                onRemovePress={onRemovePress}
                onStartPress={onStartPress}
                onStopPress={onStopPress}
            />
        )
    }
}
