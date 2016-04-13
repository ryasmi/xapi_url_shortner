#!/usr/bin/env node
import * as source_map_support from 'source-map-support';
import * as commander from 'commander';
import * as knex from 'knex';
import config from './config';

source_map_support.install({
  handleUncaughtExceptions: false
});

const knexConnection = knex(config.knex);

// Group.
import GroupFactory from './group/Factory';
import GroupController from './group/CommanderController';
import LinkFactory from './link/server/Factory';
var group_service = GroupFactory(knexConnection, 'group');
var group_controller = new GroupController(commander, group_service);
var link_service = LinkFactory(knexConnection, 'link');

// User.
import UserFactory from './user/server/Factory';
import UserController from './user/server/CommanderController';
var user_service = UserFactory(knexConnection, 'user');
var user_controller = new UserController(commander, user_service);

user_service.setGroupService(group_service);
group_service.setLinkService(link_service);
group_service.setUserService(user_service);
link_service.setGroupService(group_service);

commander.parse(process.argv);
