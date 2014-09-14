/*
 Navicat Premium Data Transfer

 Source Server         : cn_wall_street
 Source Server Type    : MySQL
 Source Server Version : 50173
 Source Host           : 61.153.100.245
 Source Database       : cn_wall_street_test

 Target Server Type    : MySQL
 Target Server Version : 50173
 File Encoding         : utf-8

 Date: 09/14/2014 16:58:03 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cpk_account`
-- ----------------------------
DROP TABLE IF EXISTS `cpk_account`;
CREATE TABLE `cpk_account` (
  `id` varchar(255) CHARACTER SET latin1 NOT NULL,
  `userName` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `mobile` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `email` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createTime` bigint(20) DEFAULT NULL,
  `updateTime` bigint(20) DEFAULT NULL,
  `token` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_account_email` (`email`),
  UNIQUE KEY `UK_account_mobile` (`mobile`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `cpk_investor`
-- ----------------------------
DROP TABLE IF EXISTS `cpk_investor`;
CREATE TABLE `cpk_investor` (
  `uid` varchar(255) CHARACTER SET latin1 NOT NULL,
  `uName` varchar(255) DEFAULT NULL,
  `fundToInvest` float DEFAULT NULL,
  `annualReturn` float DEFAULT NULL,
  `totalFund` int(11) DEFAULT NULL,
  `timeTag` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `IDX_uName` (`uName`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `cpk_news`
-- ----------------------------
DROP TABLE IF EXISTS `cpk_news`;
CREATE TABLE `cpk_news` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin,
  `createTime` bigint(20) DEFAULT NULL,
  `updateTime` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `cpk_sec_qa`
-- ----------------------------
DROP TABLE IF EXISTS `cpk_sec_qa`;
CREATE TABLE `cpk_sec_qa` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `qno` int(11) DEFAULT NULL,
  `answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `timeTag` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_uid` (`uid`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `cpk_trade_log`
-- ----------------------------
DROP TABLE IF EXISTS `cpk_trade_log`;
CREATE TABLE `cpk_trade_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `cname` varchar(255) DEFAULT NULL,
  `fund` bigint(20) DEFAULT NULL,
  `cycle` int(11) DEFAULT NULL,
  `totalReturn` bigint(20) DEFAULT NULL,
  `progress` int(11) DEFAULT NULL,
  `timeTag` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_uid` (`uid`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `cpk_trade_need`
-- ----------------------------
DROP TABLE IF EXISTS `cpk_trade_need`;
CREATE TABLE `cpk_trade_need` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `teamName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `needFund` bigint(20) DEFAULT NULL,
  `maxRetracement` float DEFAULT NULL,
  `minProxyAmount` bigint(20) DEFAULT NULL,
  `annualReturn` float DEFAULT NULL,
  `shareProportion` int(11) DEFAULT NULL,
  `preserveFlag` int(11) DEFAULT NULL,
  `momFlag` int(11) DEFAULT NULL,
  `investorId` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `other` varchar(255) DEFAULT NULL,
  `timeTag` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_uid` (`uid`) USING BTREE,
  KEY `IDX_teamName` (`teamName`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `cpk_trader`
-- ----------------------------
DROP TABLE IF EXISTS `cpk_trader`;
CREATE TABLE `cpk_trader` (
  `uid` varchar(255) CHARACTER SET latin1 NOT NULL,
  `teamName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `tradeCategory` int(11) DEFAULT NULL,
  `recentReturn` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `averageReturn` float DEFAULT NULL,
  `maxLostMonthly` float DEFAULT NULL,
  `maxRetracement` float DEFAULT NULL,
  `totalManagedFund` float DEFAULT NULL,
  `opMethod` int(11) DEFAULT NULL,
  `level` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `recommendOrder` int(11) DEFAULT '0',
  `timeTag` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `IDX_teamName` (`teamName`) USING BTREE,
  KEY `IDX_tradeCategory` (`tradeCategory`) USING BTREE,
  KEY `IDX_recommendOrder` (`recommendOrder`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;