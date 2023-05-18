import { Meteor } from 'meteor/meteor'

// Publish the current size of a collection.
Meteor.publish('users_exist', function () {
  let count = 0;
  let initializing = true;

  // `observeChanges` only returns after the initial `added` callbacks have run.
  // Until then, we don't want to send a lot of `changed` messages—hence
  // tracking the `initializing` state.
  const handle = Meteor.users.find({}).observeChanges({
    added: (id) => {
      count += 1;

      if (!initializing) {
        this.changed('usersExist', 1, { exists: count > 0 });
      }
    },

    removed: (id) => {
      count -= 1;
      this.changed('usersExist', 1, { exists: count > 0 });
    }

    // We don't care about `changed` events.
  });

  // Instead, we'll send one `added` message right after `observeChanges` has
  // returned, and mark the subscription as ready.
  initializing = false;
  this.added('usersExist', 1, { exists: count > 0 });
  this.ready();

  // Stop observing the cursor when the client unsubscribes. Stopping a
  // subscription automatically takes care of sending the client any `removed`
  // messages.
  this.onStop(() => handle.stop());
  console.log('publish users_exist')
});
