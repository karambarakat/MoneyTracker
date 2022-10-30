import type { ActionType as logCRT } from './log/create.action'
import type { ActionType as logDLT } from './log/delete.action'
import type { ActionType as logUDL } from './log/undoDelete.action'
import type { ActionType as logFDA } from './log/find.action'
import type { ActionType as logFDO } from './log/findOne.action'
import type { ActionType as logUPD } from './log/update.action'

import type { ActionType as catCRT } from './category/create.action'
import type { ActionType as catDLT } from './category/delete.action'
import type { ActionType as catFDA } from './category/find.action'
import type { ActionType as catFDO } from './category/findOne.action'
import type { ActionType as catUPD } from './category/update.action'

import type { ActionType as usrLIN } from './user/login.action'
import type { ActionType as usrLOT } from './user/logout.action'
import type { ActionType as usrSUP } from './user/signup.action'
import type { ActionType as usrOFF } from './user/offline.action'
import type { ActionType as usrON_ } from './user/online.action'

import type { ActionType as prfFTC } from './profile/fetch.action'
import type { ActionType as prfPSW } from './profile/password.action'
import type { ActionType as prfUPD } from './profile/update.action'

import type { ActionType as appNAV } from './app/navigate.action'

export type actions =
  | logUPD
  | logCRT
  | logDLT
  | logUDL
  | logFDA
  | logFDO
  | catCRT
  | catDLT
  | catFDA
  | catFDO
  | catUPD
  | usrLIN
  | usrLOT
  | usrSUP
  | usrOFF
  | usrON_
  | prfFTC
  | prfPSW
  | prfUPD
  | appNAV
