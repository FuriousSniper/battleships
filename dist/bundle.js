/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Rules.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Rules.ts":
/*!**********************!*\
  !*** ./src/Rules.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Rules = /** @class */ (function () {\r\n    function Rules() {\r\n        this.started = false;\r\n        this.finished = false;\r\n        this.playerVictory = false;\r\n        this.cpuVictory = false;\r\n        this.cpuCanShoot = false;\r\n        this.playerCanShoot = false;\r\n    }\r\n    Rules.prototype.checkWin = function (who, tab) {\r\n        if (!who) //false - player, true- cpu\r\n            this.playerVictory = true;\r\n        else\r\n            this.cpuVictory = true;\r\n        for (var i = 0; i < tab.length; i++) {\r\n            for (var j = 0; j < tab[i].length; j++) {\r\n                if (tab[i][j] == 1) {\r\n                    if (!who)\r\n                        this.playerVictory = false;\r\n                    else\r\n                        this.cpuVictory = false;\r\n                    break;\r\n                }\r\n                else\r\n                    continue;\r\n            }\r\n        }\r\n        if (this.playerVictory) {\r\n            alert(\"YOU WON!!!!!!!!\");\r\n            this.finished = true;\r\n        }\r\n        if (this.cpuVictory) {\r\n            alert(\"CPU WON!!!!!!!!\");\r\n            this.finished = true;\r\n        }\r\n    };\r\n    Rules.prototype.currentPlayer = function () {\r\n        document.getElementById(\"tips\").innerHTML = \"\";\r\n        if (this.playerCanShoot)\r\n            document.getElementById(\"tips\").innerHTML = \"Ruch gracza\";\r\n        else\r\n            document.getElementById(\"tips\").innerHTML = \"Ruch komputera\";\r\n    };\r\n    return Rules;\r\n}());\r\nexports.Rules = Rules;\r\n\n\n//# sourceURL=webpack:///./src/Rules.ts?");

/***/ })

/******/ });