import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import schema from './schema';

const pubsub = new PubSub();
const subscriptionManager = new SubscriptionManager({
        schema,
        pubsub,
        setupFunctions: {
            commentAdded: (options, args) => ({
            commentAdded: comment => comment.repoName === args.repoFullName,
    }),
    },
    });

export { subscriptionManager, pubsub };
