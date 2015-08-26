# cqrs4js
A proof of concept cqrs implementation in JavaScript

# Overview

The main components are commands, models, events and views, all linked through a command bus and an event bus. 

## Commands

Commands express the will of the user to change the state somehow. They're transported through the command bus to some model. 

Commands carry the required data to evaluate the change required. Commands are named after the change pursued, with a verb in imperative form, for example "AddUser" or "DeleteAccount".

When a command is fired, it must have a model to handle it. Conversely, a command must have only model to handle it.

## Models 

Models receive their commands through the command bus.

Each model has its own internal state, if it needs one to be able to evaluate the outcome of the command. This state is only about the checks needed for evaluating the commands' outcomes. 

For example, when receiving the AddUser command with a login, a mail and username, a model may just check for uniqueness of the login, which requires the list of all logins, whereas the rest of the data may just be checked for being present (aka not null).

When a command has been evaluated, models fire events, be it of suceess or failure. Events are sent through the event bus.

## Events

Events express facts that did happen. As such, they can't be rollbacked or cancelled, they're are just facts of the past.

As such, events' names are using verbs in the past tense, for example "UserAdded" or "AccountDeleted". They also carry a payload for the extra information needed.

Events are transported throught the event bus, from the user interface or models to views and models.

An event can be consummed by multiple views and models, or nothing, in which case obviously noone cares. 

## Views

Views contains the data to show to the user, based on the events received. 

Views are watched for changes in the user interface, allowing it to refresh on each change.

Views are presentation oriented: their data are stored in the way the user interface needs. As such, views can aggregate or drop part of the events' payload, as well as mulitple views can present the same data in different ways.

## Command bus and event bus

These bus transport, respectively, comamnds and events. For this, one just needs to construct the command or event and then publishes it through the bus. The consumers of the message aren't known at this point, making publishing really decoupled from the handling of messages.

These bus are also used to subscribe to commands and events, through a callback. Each time some commands or events are published, the matching callbacks are called.

As said in the Commands part, the command bus requires one and only one callback per command. 

# Why cqrs4js ?

Initially, while coming from an Event Sourcing (ES) and CQRS (Command Query Request Segregation) background, we went for one of the flux implementations. 

In flux, the UI fires some actions which are then consummed by stores, which in turn update the UI. This is called the unidirectional dataflow, a nice loop always flowing the same way.

However, it feels to us flux breaks when some actions must be validated and thus can fail. Indeed, where to put this validation and how to inform in case of failure?

We have seen different approaches in flux regarding this matter, from the UI doing all the validation upfront to actions able to fail and returning error messages. Either way this feels like breaking the unidirectional dataflow spoken of above.

Furthermore, what if some state must be maintened and checked against? 

For example, in the case of some AddUser scenario, one could have an administration interface allowing for multiple account creations at the same time. Considering that all is asyncrhonous in JavaScript, two actions could get the current state one after the other, and then each validate that some login is not already present and then decide to add it. No luck, these two actions could be adding ... the same login.

It means that validation requires, for some use cases at least, some state which must be next to the validation logic (and not an asynchronous call away).

Here come CQRS and the Command pattern, where the models handling the commands do the validation while having some state if needs be.

# Disclaimer

This is a side activity from the ones having committed on it, so progress can be patchy, at best, and the code comes with no warranty whatsoever. 
