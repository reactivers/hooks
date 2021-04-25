import React, { createContext, useReducer, useMemo, useCallback, useContext, useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/min/locales.min';
import { useHistory as useHistory$1, Route, BrowserRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var mainColor = "#002171";
var successColor = "green";
var dangerColor = "#EF5350";
var routes = {
  publicRoutes: [],
  authorizedRoutes: []
};
var getRoutes = function getRoutes() {
  return routes;
};
var setRoutes = function setRoutes(newRoutes) {
  routes = newRoutes;
};
var appURLs = {
  HTTP_REST_SERVER: {
    development: "http://localhost:8080/api",
    production: "http://localhost:8080/api"
  },
  WS_REST_SERVER: {
    development: "ws://localhost:8080/ws",
    production: "ws://localhost:8080/ws"
  }
};
var APP_NAMES = {
  WS_REST_SERVER: "WS_REST_SERVER",
  HTTP_REST_SERVER: "HTTP_REST_SERVER"
};
var getAppURLs = function getAppURLs() {
  return appURLs;
};
var setAppURLs = function setAppURLs(newAppURLs) {
  appURLs = newAppURLs;
};
var getAppNames = function getAppNames() {
  return APP_NAMES;
};
var setAppNames = function setAppNames(newAppNames) {
  APP_NAMES = newAppNames;
};

var getAppURL = function getAppURL(appname) {
  var NODE_ENV = process.env.NODE_ENV;
  var appURLs = getAppURLs() || {};
  return appURLs[appname][NODE_ENV];
};

var getMainColor = function getMainColor() {
  return mainColor;
};
var setMainColor = function setMainColor(color) {
  mainColor = color;
};
var getSuccessColor = function getSuccessColor() {
  return successColor;
};
var setSuccessColor = function setSuccessColor(color) {
  successColor = color;
};
var getDangerColor = function getDangerColor() {
  return dangerColor;
};
var setDangerColor = function setDangerColor(color) {
  dangerColor = color;
};
var constants = {
  mainColor: getMainColor(),
  successColor: getSuccessColor(),
  mainDangerColor: getDangerColor(),
  REST_SERVER: getAppURL(getAppNames().HTTP_REST_SERVER),
  WS_SERVER: getAppURL(getAppNames().WS_REST_SERVER)
};

var trTRLocales = {
  Back: function Back() {
    return "Geri";
  },
  New: function New() {
    return "Yeni";
  },
  Save: function Save() {
    return "Kaydet";
  },
  Decline: function Decline() {
    return "Vazgeç";
  },
  Delete: function Delete() {
    return "Sil";
  },
  Edit: function Edit() {
    return "Düzenle";
  },
  Update: function Update() {
    return "Güncelle";
  },
  Accept: function Accept() {
    return "Kabul Et";
  },
  Stores: function Stores() {
    return "Mağazalar";
  },
  Purchases: function Purchases() {
    return "Satın Alımlar";
  },
  Sales: function Sales() {
    return "Satışlar";
  },
  Profile: function Profile() {
    return "Profil";
  },
  Menu: function Menu() {
    return "Menü";
  },
  Payment: function Payment() {
    return "Ödeme";
  },
  Orders: function Orders() {
    return "Siparişler";
  },
  Tables: function Tables() {
    return "Masalar";
  },
  Username: function Username() {
    return "Kullanıcı Adı";
  },
  Password: function Password() {
    return "Şifre";
  },
  FirstName: function FirstName() {
    return "Ad";
  },
  LastName: function LastName() {
    return "Soyad";
  },
  PhoneNumber: function PhoneNumber() {
    return "Telefon";
  },
  UpdateProfile: function UpdateProfile() {
    return "Profil Güncelle";
  },
  Title: function Title() {
    return "Başlık";
  },
  Color: function Color() {
    return "Renk";
  },
  NewEvent: function NewEvent() {
    return "Yeni Etkinlik";
  },
  Invitations: function Invitations() {
    return "Davetiyeler";
  },
  NoInvitations: function NoInvitations() {
    return "Davetiye bulunamadı";
  },
  Home: function Home() {
    return "Ana Sayfa";
  },
  Today: function Today() {
    return "Bugün";
  },
  Tomorrow: function Tomorrow() {
    return "Yarın";
  },
  ThisWeek: function ThisWeek() {
    return "Bu Hafta";
  },
  ThisMonth: function ThisMonth() {
    return "Bu Ay";
  },
  EmptyEvents: function EmptyEvents() {
    return "Etkinlik Bulunmamaktadır.";
  },
  EmptyTags: function EmptyTags() {
    return "Etiket Bulunmamaktadır.";
  },
  SignIn: function SignIn() {
    return "Giriş Yap";
  },
  SignUp: function SignUp() {
    return "Üye Ol";
  },
  StartTime: function StartTime() {
    return "Başlangıç Saati";
  },
  EndTime: function EndTime() {
    return "Bitiş Saati";
  },
  Descriptions: function Descriptions() {
    return "Açıklamalar";
  },
  Shared: function Shared() {
    return "Paylaşılanlar";
  },
  Search: function Search() {
    return "Ara";
  },
  Agenda: function Agenda() {
    return "Ajanda";
  },
  Events: function Events() {
    return "Etkinlikler";
  },
  Tags: function Tags() {
    return "Etiketler";
  },
  NewTag: function NewTag() {
    return "Yeni Etiket";
  },
  EditTag: function EditTag() {
    return "Etiketi Düzenle";
  },
  Complete: function Complete() {
    return "Tamamla";
  },
  ByYou: function ByYou() {
    return "Senin";
  },
  UploadImage: function UploadImage() {
    return "Görsel Yükle";
  },
  DeleteConfirm: function DeleteConfirm() {
    return "Silmek istediğinize emin misiniz?";
  },
  AlreadyHaveAnAccount: function AlreadyHaveAnAccount() {
    return "Zaten üyeyim?";
  },
  CancelInviteConfirm: function CancelInviteConfirm() {
    return "Davetiyeyi İptal etmek istediğinize emin misiniz?";
  },
  CompletedBy: function CompletedBy(_ref) {
    var username = _ref.username,
        date = _ref.date;
    return /*#__PURE__*/React.createElement(React.Fragment, null, username, " taraf\u0131ndan ", date, " tarihinde tamamland\u0131.");
  },
  UpdatedBy: function UpdatedBy(_ref2) {
    var username = _ref2.username,
        date = _ref2.date;
    return /*#__PURE__*/React.createElement(React.Fragment, null, username, " taraf\u0131ndan ", date, " tarihinde g\xFCncellendi.");
  },
  Loading: function Loading() {
    return "Yükleniyor...";
  }
};

var enUSLocales = {
  Back: function Back() {
    return "Back";
  },
  New: function New() {
    return "New";
  },
  Decline: function Decline() {
    return "Decline";
  },
  Delete: function Delete() {
    return "Delete";
  },
  Edit: function Edit() {
    return "Edit";
  },
  Save: function Save() {
    return "Save";
  },
  Update: function Update() {
    return "Update";
  },
  Purchases: function Purchases() {
    return "Purchases";
  },
  Sales: function Sales() {
    return "Sales";
  },
  Profile: function Profile() {
    return "Profile";
  },
  Menu: function Menu() {
    return "Menu";
  },
  Payment: function Payment() {
    return "Payment";
  },
  Orders: function Orders() {
    return "Orders";
  },
  Tables: function Tables() {
    return "Tables";
  },
  Stores: function Stores() {
    return "Stores";
  },
  Loading: function Loading() {
    return "Loading...";
  },
  Username: function Username() {
    return "Username";
  },
  Password: function Password() {
    return "Password";
  },
  FirstName: function FirstName() {
    return "First name";
  },
  LastName: function LastName() {
    return "Last name";
  },
  PhoneNumber: function PhoneNumber() {
    return "Phone";
  },
  UpdateProfile: function UpdateProfile() {
    return "Update Profile";
  },
  Accept: function Accept() {
    return "Accept";
  },
  Title: function Title() {
    return "Title";
  },
  Color: function Color() {
    return "Color";
  },
  NewEvent: function NewEvent() {
    return "New Event";
  },
  Invitations: function Invitations() {
    return "Invitations";
  },
  NoInvitations: function NoInvitations() {
    return "No Invitation";
  },
  Home: function Home() {
    return "Home";
  },
  Today: function Today() {
    return "Today";
  },
  Tomorrow: function Tomorrow() {
    return "Tomorrow";
  },
  ThisWeek: function ThisWeek() {
    return "This Week";
  },
  ThisMonth: function ThisMonth() {
    return "This Month";
  },
  EmptyEvents: function EmptyEvents() {
    return "No Event.";
  },
  EmptyTags: function EmptyTags() {
    return "No Tag.";
  },
  SignIn: function SignIn() {
    return "Sign In";
  },
  SignUp: function SignUp() {
    return "Sign Up";
  },
  StartTime: function StartTime() {
    return "Start Time";
  },
  EndTime: function EndTime() {
    return "End Time";
  },
  Descriptions: function Descriptions() {
    return "Descriptions";
  },
  Shared: function Shared() {
    return "Shared";
  },
  Search: function Search() {
    return "Search";
  },
  Agenda: function Agenda() {
    return "Agenda";
  },
  Events: function Events() {
    return "Events";
  },
  Tags: function Tags() {
    return "Tags";
  },
  NewTag: function NewTag() {
    return "New Tag";
  },
  EditTag: function EditTag() {
    return "Edit Tag";
  },
  Complete: function Complete() {
    return "Complete";
  },
  ByYou: function ByYou() {
    return "You";
  },
  UploadImage: function UploadImage() {
    return "Upload Image";
  },
  DeleteConfirm: function DeleteConfirm() {
    return "Are you sure want to delete?";
  },
  CancelInviteConfirm: function CancelInviteConfirm() {
    return "Are you sure want to cancel?";
  },
  AlreadyHaveAnAccount: function AlreadyHaveAnAccount() {
    return "Already a member";
  },
  CompletedBy: function CompletedBy(_ref) {
    var username = _ref.username,
        date = _ref.date;
    return /*#__PURE__*/React.createElement(React.Fragment, null, "Completed by ", username, " at ", date);
  },
  UpdatedBy: function UpdatedBy(_ref2) {
    var username = _ref2.username,
        date = _ref2.date;
    return /*#__PURE__*/React.createElement(React.Fragment, null, "Updated by ", username, " at ", date);
  }
};

var AllLocales = {
  tr: _objectSpread2({}, trTRLocales),
  en: _objectSpread2({}, enUSLocales),
  "en-us": _objectSpread2({}, enUSLocales),
  "en-en": _objectSpread2({}, enUSLocales)
};

var Locales = {
  Stores: "Stores",
  Search: "Search",
  Profile: "Profile",
  Tables: "Tables",
  Purchases: "Purchases",
  Sales: "Sales",
  Payment: "Payment",
  Waiting: "Waiting",
  Orders: "Orders",
  Home: "Home",
  Menu: "Menu",
  New: "New",
  Edit: "Edit",
  Delete: "Delete",
  Save: "Save",
  Decline: "Decline",
  Back: "Back",
  Update: "Update",
  Accept: "Accept",
  Username: "Username",
  Password: "Password",
  FirstName: "FirstName",
  LastName: "LastName",
  PhoneNumber: "PhoneNumber",
  UpdateProfile: "UpdateProfile",
  Title: "Title",
  Color: "Color",
  NewEvent: "NewEvent",
  Invitations: "Invitations",
  NoInvitations: "NoInvitations",
  Today: "Today",
  Tomorrow: "Tomorrow",
  ThisWeek: "ThisWeek",
  ThisMonth: "ThisMonth",
  EmptyEvents: "EmptyEvents",
  EmptyTags: "EmptyTags",
  SignIn: "SignIn",
  SignUp: "SignUp",
  StartTime: "StartTime",
  EndTime: "EndTime",
  Descriptions: "Descriptions",
  Shared: "Shared",
  Agenda: "Agenda",
  Events: "Events",
  Tags: "Tags",
  NewTag: "NewTag",
  EditTag: "EditTag",
  Complete: "Complete",
  ByYou: "ByYou",
  UploadImage: "UploadImage",
  DeleteConfirm: "DeleteConfirm",
  AlreadyHaveAnAccount: "AlreadyHaveAnAccount",
  CancelInviteConfirm: "CancelInviteConfirm",
  CompletedBy: "CompletedBy",
  UpdatedBy: "UpdatedBy",
  Loading: "Loading"
};

moment.locale(navigator.language);
var defaultLocale = undefined;
var setDefaultLocale = function setDefaultLocale(locale) {
  defaultLocale = locale;
};
var updateLocales = function updateLocales(region, values) {
  var oldLocales = AllLocales[region] || {};
  AllLocales[region] = _objectSpread2(_objectSpread2({}, oldLocales), values);
  Object.keys(values).forEach(function (i) {
    Locales[i] = i;
  });
};
var deepCopy = function deepCopy() {
  var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return JSON.parse(JSON.stringify(json));
};
var combineReducers = function combineReducers(reducers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var newState = {};

    for (var key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }

    return newState;
  };
};
var transformObj = function transformObj(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    if (key.indexOf('.') >= 0) {
      var _key$split = key.split('.'),
          _key$split2 = _slicedToArray(_key$split, 2),
          parentKey = _key$split2[0],
          childKey = _key$split2[1];

      acc[parentKey] = acc[parentKey] || {};
      acc[parentKey][childKey] = obj[key];
    } else {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
};
var JSONToArray = function JSONToArray() {
  var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var key = arguments.length > 1 ? arguments[1] : undefined;
  var valueKey = arguments.length > 2 ? arguments[2] : undefined;
  return Object.keys(json).map(function (_key) {
    return _objectSpread2(_objectSpread2({}, valueKey ? _defineProperty({}, valueKey, json[_key]) : json[_key]), {}, _defineProperty({}, key, _key));
  });
};
var EnumToArray = function EnumToArray(enums, valueKey, descriptionKey) {
  return Object.keys(enums).map(function (_key) {
    var _ref2;

    return _ref2 = {}, _defineProperty(_ref2, valueKey, _key), _defineProperty(_ref2, descriptionKey, enums[_key]), _ref2;
  });
};
var download = function download(newBlob, type) {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  }

  var URL = window.URL || window.webkitURL || window;
  var dataURL = URL.createObjectURL(newBlob);
  downloadByDataURL(dataURL, type);
};
var downloadQRCodeById = function downloadQRCodeById(id) {
  var QRCodeSVGElement = document.getElementById(id);
  downloadQRCodeBySVGElement(QRCodeSVGElement);
};
var downloadQRCodeBySVGElement = function downloadQRCodeBySVGElement(QRCodeSVGElement, type) {
  var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _width = size.width,
      _height = size.height;
  var width = _width || 300,
      height = _height || 300;
  var clonedQRCodeSVGElement = QRCodeSVGElement.cloneNode(true);
  var outerHTML = clonedQRCodeSVGElement.outerHTML;
  var blob = new Blob([outerHTML], {
    type: 'image/svg+xml;charset=utf-8'
  });
  var URL = window.URL || window.webkitURL || window;
  var blobURL = URL.createObjectURL(blob);

  if (type === "svg") {
    downloadByDataURL(blobURL, "svg");
    return;
  }

  var img = new Image();
  img.width = "".concat(width);
  img.height = "".concat(height);
  var canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.widht = width;
  canvas.height = height;
  var context = canvas.getContext('2d');

  img.onload = function () {
    // draw image in canvas starting left-0 , top - 0
    context.drawImage(img, 0, 0, width, height);
    var dataURL = canvas.toDataURL("image/png"); //return;

    downloadByDataURL(dataURL, "png");
    document.body.removeChild(canvas);
  };

  img.src = blobURL;
};
var downloadByDataURL = function downloadByDataURL(dataURL, type) {
  var link = document.createElement('a');
  var n = dataURL.lastIndexOf('/'); //debugger;

  var filname = dataURL.substring(n + 1, dataURL.length);
  link.href = dataURL;
  link.target = '_blank_';

  if (type) {
    link.download = "".concat(filname, ".").concat(type);
  } else {
    link.download = "".concat(filname, ".jpg");
  }

  link.click();
  var URL = window.URL || window.webkitURL || window;
  setTimeout(function () {
    // For Firefox it is necessary to delay revoking the ObjectURL
    URL.revokeObjectURL(dataURL);
  }, 100);
};
var bytesToSize = function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};
var sum = function sum() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  if (!array.length) return 0;
  if (array.length === 1) return array[0];
  return array.reduce(function (i1, i2) {
    return i1 + i2;
  });
};
var ArrayToJSON = function ArrayToJSON(array, keyName, valueName) {
  var json = {};
  array.forEach(function (i) {
    json[i[keyName]] = valueName ? i[valueName] : i;
  });
  return json;
};
var formatDate = function formatDate(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "DD MMMM YYYY";
  return moment(date).format(format);
};
var getLocale = function getLocale(payload) {
  var name = payload.name,
      params = payload.params;
  var language = navigator.language;
  var locale = AllLocales[language] || AllLocales[defaultLocale] || {};
  var localeValue = locale[name];

  if (localeValue) {
    return localeValue(params);
  }

  return name;
};
var isJSONEmpty = function isJSONEmpty() {
  var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return !Object.keys(json).length;
};
var isArrayEmpty = function isArrayEmpty() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return !array.length;
};
var guid = function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
var getAddressText = function getAddressText() {
  var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var province = address.province,
      district = address.district;

  var _ref3 = province || {},
      provinceName = _ref3.name;

  var _ref4 = district || {},
      districtName = _ref4.name;

  return (provinceName || "") + " - " + (districtName || "");
};
var getUriFromImageObject = function getUriFromImageObject() {
  var image = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (image.base64Data) {
    return "data:".concat(image.fileType, ";base64,").concat(image.base64Data);
  } else if (image.id) {
    return "".concat(constants.REST_SERVER, "/attachments/").concat(image.id);
  } else {
    return undefined;
  }
};
var updateObjectByName = function updateObjectByName() {
  var oldObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = arguments.length > 1 ? arguments[1] : undefined;
  var value = arguments.length > 2 ? arguments[2] : undefined;

  var newObject = _objectSpread2({}, deepCopy(oldObject));

  newObject[name] = value;
  return transformObj(newObject);
};
var getFirstLetters = function getFirstLetters() {
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return string.split(" ").map(function (i) {
    return i[0];
  }).join("");
};
var hashCode = function hashCode(str) {
  var hash = 0;

  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
};
var generatedColorFromString = function generatedColorFromString(_i) {
  var i = hashCode(_i);
  var c = (i & 0x00FFFFFF).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
};
var destructArray = function destructArray() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var result = [];
  array.forEach(function (i) {
    result.push.apply(result, _toConsumableArray(i));
  });
  return result;
};
var getCurrentURL = function getCurrentURL() {
  var REACT_APP_APP_ID = process.env.REACT_APP_APP_ID;
  return getAppURL$1(REACT_APP_APP_ID);
};
var getAppURL$1 = function getAppURL(appname) {
  var NODE_ENV = process.env.NODE_ENV;
  var appURLs = getAppURLs() || {};
  var appURL = appURLs[appname] || {};
  return appURL[NODE_ENV];
};
var takeUndefinedAsTrue = function takeUndefinedAsTrue(parameter) {
  return parameter === undefined ? true : parameter;
};
var iFetch = function iFetch(payload) {
  var signal = payload.signal,
      endpoint = payload.endpoint,
      method = payload.method,
      params = payload.params,
      formData = payload.formData,
      token = payload.token,
      onSuccess = payload.onSuccess,
      onError = payload.onError;
  var appName = getAppNames().HTTP_REST_SERVER;

  var _url = getAppURL$1(appName);

  var url = "".concat(_url).concat(endpoint);
  var body = params ? JSON.stringify(params) : formData;
  var headers = {
    "Content-Type": "application/json"
  };
  if (token) headers["Authorization"] = "Bearer " + token;

  if (formData) {
    delete headers["Content-Type"];
  }

  fetch(url, {
    signal: signal,
    method: method || (params || formData ? "POST" : "GET"),
    body: body,
    headers: headers
  }).then(function (i) {
    var contentType = (i.headers.get('Content-Type') || '').split(";")[0];

    if (i.ok) {
      switch (contentType) {
        case 'application/json':
          i.json().then(function (i2) {
            if (i2 instanceof Array) onSuccess(i2);else if (i2.success !== undefined && !i2.success) onError(i, i2);else onSuccess(i2);
          }, function (error) {
            console.error(url, error);
            onSuccess({});
          });
          break;

        default:
          i.blob().then(function (blob) {
            onSuccess(new Blob([blob], {
              type: contentType
            }));
          });
          break;
      }
    } else if (i.status === 400) {
      console.error("status 400 error", url, i);
      i.json().then(function (i2) {
        onError(i, i2);
      });
    } else {
      onError(i);
    }
  }).catch(function (e) {
    console.error("e", e);
    onError(e);
  });
};
var changeColor = function changeColor(color, amt) {
  var usePound = false;
  var col = color + "";

  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);
  var r = (num >> 16) + amt;

  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }

  var b = (num >> 8 & 0x00FF) + amt;

  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  var g = (num & 0x0000FF) + amt;

  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  return (usePound ? "#" : "") + (g | b << 8 | r << 16).toString(16);
};
var takeIf = function takeIf(condition, value) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  if (condition) {
    return value;
  } else {
    return defaultValue;
  }
};
var spliceString = function spliceString(string, startCount, deleteCount) {
  return string.split("").splice(startCount, deleteCount).join("");
};
var dateToDescription = function dateToDescription(date) {
  var momentDay = moment(date, "YYYY-MM-DD");
  var momentToday = moment(new Date(), "YYYY-MM-DD");
  var dayDiff = momentToday.diff(momentDay, 'days');
  var monthDiff = momentToday.diff(momentDay, 'month');
  if (dayDiff === 1) return "D\xFCn";else if (dayDiff) {
    return "".concat(monthDiff || dayDiff, " ").concat(monthDiff ? "ay" : "gün", " \xF6nce");
  } else {
    return "Bugün";
  }
};
var isNullOrUndefined = function isNullOrUndefined(item) {
  return item === null || item === undefined;
};
var coalasce = function coalasce(first, second) {
  if (isNullOrUndefined(first)) return second;
  return first;
};
var numberShouldStartWithZero = function numberShouldStartWithZero(number) {
  return parseInt(number) < 10 ? "0".concat(number) : number;
};
var getTodayYear = function getTodayYear() {
  return new Date().getFullYear();
};
var getTodayMonth = function getTodayMonth() {
  return new Date().getMonth() + 1;
};
var getMonthDescription = function getMonthDescription(_month) {
  var month = numberShouldStartWithZero(_month);
  return moment("2020-".concat(month, "-01")).format("MMMM");
};
var getDatesOfYear = function getDatesOfYear(year) {
  var date = moment("".concat(year, "-01-01"));
  var currentYear = year;
  var dates = [];

  while (currentYear === year) {
    dates.push(date.format("YYYY-MM-DD"));
    date = moment(date).add(1, 'day');
    currentYear = date.get("year");
  }

  return dates;
};
var monthsNumberArray = Array(12).fill(0).map(function (_, index) {
  return index % 12 + 1;
});
var isArrayContains = function isArrayContains(array, value, key) {
  return !!array.filter(function (i) {
    return i[key] === value;
  }).length;
};
var JSONArrayIndexOf = function JSONArrayIndexOf(array, value, key) {
  return array.map(function (i) {
    return i[key];
  }).indexOf(value);
};
var cos = function cos(degree) {
  return Math.cos(degree * Math.PI / 180).toFixed(2) * 1;
};
var insertOrUpdateElementInArrayByKey = function insertOrUpdateElementInArrayByKey(array, idKey, id, item) {
  var idKeys = array.map(function (i) {
    return i[idKey];
  });
  var indexOfElement = idKeys.indexOf(id);
  if (indexOfElement > -1) array[indexOfElement] = item;else array.push(item);
  return array;
};
var deleteElementFromArrayByKey = function deleteElementFromArrayByKey(array, idKey, id) {
  var idKeys = array.map(function (i) {
    return i[idKey];
  });
  var indexOfElement = idKeys.indexOf(id);
  if (indexOfElement > -1) array.splice(indexOfElement, 1);
  return array;
};
var findLastIndex = function findLastIndex(array, predicate) {
  if (!array) return -1;
  var index = array.length - 1;
  if (!predicate) return index;

  for (index; index--; index > -1) {
    if (predicate(array[index])) break;
  }

  return index;
};

var authActions = {
  SET_TOKEN: "set-token",
  UPDATE_AUTH: "update-auth",
  LOGIN: 'login',
  LOGOUT: 'logout',
  SIGNUP: 'signup'
};
var notificationActions = {
  PUSH_IN_APP_NOTIFICATION: 'pushInAppNotification',
  POP_IN_APP_NOTIFICATION: 'popInAppNotification'
};
var modalActions = {
  SHOW_MODAL: 'show-modal',
  HIDE_MODAL: 'hide-modal',
  DELETE_MODAL: "delete-modal"
};
var lodaingActions = {
  INCREASE_LOADING_QUEUE: 'increaseLoadingQueue',
  DECREASE_LOADING_QUEUE: 'decreaseLoadingQueue'
};
var socketActions = {
  ADD_MESSAGE_LISTENER: 'addMessageListener',
  REMOVE_MESSAGE_LISTENER: 'removeMessageListener',
  SET_SOCKET: 'setSocket'
};

var actions = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, authActions), notificationActions), modalActions), lodaingActions), socketActions);

var authReducer = function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  var _ref = action.payload || {},
      data = _ref.data;

  switch (action.type) {
    case actions.SET_TOKEN:
      return _objectSpread2(_objectSpread2({}, state), data || {});

    case actions.UPDATE_AUTH:
      return _objectSpread2(_objectSpread2({}, state), data || {});

    case actions.LOGIN:
      return _objectSpread2(_objectSpread2(_objectSpread2({}, state), data || {}), {}, {
        checked: true,
        isLoggedIn: true
      });

    case actions.LOGOUT:
      return {
        checked: true,
        isLoggedIn: false
      };

    default:
      return state;
  }
};

var loadingReducer = function loadingReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var queue = state.queue;

  switch (action.type) {
    case actions.INCREASE_LOADING_QUEUE:
      return {
        queue: queue + 1
      };

    case actions.DECREASE_LOADING_QUEUE:
      return {
        queue: queue > 0 ? queue - 1 : 0
      };
  }

  return state;
};

var notificationsReducer = function notificationsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  var _ref = action.payload || {},
      data = _ref.data;

  var _ref2 = data || {},
      index = _ref2.index,
      type = _ref2.type,
      title = _ref2.title,
      message = _ref2.message;

  var oldState = _toConsumableArray(state);

  switch (action.type) {
    case actions.PUSH_IN_APP_NOTIFICATION:
      oldState.push({
        type: type,
        title: title,
        message: message
      });
      return oldState;

    case actions.POP_IN_APP_NOTIFICATION:
      oldState.splice(index, 1);
      return oldState;
  }

  return state;
};

var modalsReducer = function modalsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  var _ref = action.payload || {},
      _id = _ref.id,
      rest = _objectWithoutProperties(_ref, ["id"]);

  var id = _id || guid();

  var oldState = _objectSpread2({}, state);

  switch (action.type) {
    case actions.SHOW_MODAL:
      oldState[id] = _objectSpread2({
        id: id,
        visible: true
      }, rest);
      return oldState;

    case actions.HIDE_MODAL:
      oldState[id] = _objectSpread2({
        id: id,
        visible: false
      }, rest);
      return oldState;

    case actions.DELETE_MODAL:
      delete oldState[id];
      return oldState;
  }

  return state;
};

var initialState = {
  auth: {},
  loading: {
    queue: 0
  },
  notifications: [],
  modals: {}
};
var reducers = {
  auth: authReducer,
  loading: loadingReducer,
  notifications: notificationsReducer,
  modals: modalsReducer
};
var rootReducer = combineReducers(reducers);
var StoreContext = /*#__PURE__*/createContext(initialState);

var StoreProvider = function StoreProvider(_ref) {
  var children = _ref.children;

  var _useReducer = useReducer(rootReducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var store = useMemo(function () {
    return [state, dispatch];
  }, [state]);
  return /*#__PURE__*/React.createElement(StoreContext.Provider, {
    value: store
  }, children);
};

var useLocalStorage = function useLocalStorage(key, defaultValue) {
  var getItem = useCallback(function (_defaultValue) {
    try {
      var value = JSON.parse(window.localStorage.getItem(key));
      return value || _defaultValue || defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }, [defaultValue, key]);
  var setItem = useCallback(function (_value) {
    try {
      var value = JSON.stringify(_value);
      window.localStorage.setItem(key, value);
    } catch (e) {
      window.localStorage.setItem(key, defaultValue || '{}');
    }
  }, [defaultValue, key]);
  var removeItem = useCallback(function () {
    window.localStorage.removeItem(key);
  }, [key]);
  return {
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem
  };
};

var useAuth = function useAuth() {
  var _useContext = useContext(StoreContext),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var _useLocalStorage = useLocalStorage("token"),
      setItem = _useLocalStorage.setItem;

  var _ref = state || {},
      auth = _ref.auth;

  var logout = useCallback(function () {
    setItem("");
    dispatch({
      type: actions.LOGOUT
    });
    var gapi = window.gapi;
    if (gapi) if (gapi.auth2) {
      var auth2 = gapi.auth2.getAuthInstance();

      if (auth2) {
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
      }
    }
    var FB = window.FB;

    if (FB) {
      if (FB.logout) {
        FB.logout(function (response) {});
      }
    }
  }, [dispatch, setItem]);
  var setToken = useCallback(function (token) {
    if (token) setItem(token);
    dispatch({
      type: actions.SET_TOKEN,
      payload: {
        data: {
          token: token
        }
      }
    });
  }, [dispatch, setItem]);
  var update = useCallback(function (data) {
    dispatch({
      type: actions.UPDATE_AUTH,
      payload: {
        data: data
      }
    });
  }, [dispatch]);
  var login = useCallback(function (data) {
    setToken(data.token);
    delete data.token;
    dispatch({
      type: actions.LOGIN,
      payload: {
        data: data,
        checked: true,
        isLoggedIn: true
      }
    });
  }, [dispatch, setToken]);
  return _objectSpread2(_objectSpread2({}, auth), {}, {
    logout: logout,
    setToken: setToken,
    login: login,
    update: update
  });
};

var useLoading = function useLoading() {
  var _useContext = useContext(StoreContext),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var loading = state.loading;
  var increase = useCallback(function () {
    dispatch({
      type: actions.INCREASE_LOADING_QUEUE
    });
  }, []);
  var decrease = useCallback(function () {
    dispatch({
      type: actions.DECREASE_LOADING_QUEUE
    });
  }, []);
  var isLoading = loading && loading > 0;
  return _objectSpread2(_objectSpread2({}, loading), {}, {
    isLoading: isLoading,
    increase: increase,
    decrease: decrease
  });
};

var useNotification = function useNotification() {
  var _useContext = useContext(StoreContext),
      _useContext2 = _slicedToArray(_useContext, 2),
      dispatch = _useContext2[1];

  var pushNotification = useCallback(function (params) {
    var type = params.type,
        rest = _objectWithoutProperties(params, ["type"]);

    dispatch({
      type: actions.PUSH_IN_APP_NOTIFICATION,
      payload: {
        data: _objectSpread2({
          type: type
        }, rest)
      }
    });
  }, [dispatch]);
  var pushSuccessNotification = useCallback(function (params) {
    pushNotification(_objectSpread2({
      type: 'success'
    }, params));
  }, [pushNotification]);
  var pushErrorNotification = useCallback(function (params) {
    pushNotification(_objectSpread2({
      type: 'error'
    }, params));
  }, [pushNotification]);
  var pushInfoNotification = useCallback(function (params) {
    pushNotification(_objectSpread2({
      type: 'info'
    }, params));
  }, [pushNotification]);
  return {
    pushNotification: pushNotification,
    pushSuccessNotification: pushSuccessNotification,
    pushErrorNotification: pushErrorNotification,
    pushInfoNotification: pushInfoNotification
  };
};

var useApi = function useApi() {
  var _payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _useNotification = useNotification(),
      pushInfoNotification = _useNotification.pushInfoNotification,
      pushErrorNotification = _useNotification.pushErrorNotification;

  var _useLoading = useLoading(),
      increase = _useLoading.increase,
      decrease = _useLoading.decrease;

  var _useAuth = useAuth(),
      token = _useAuth.token,
      logout = _useAuth.logout;

  var _useState = useState(_payload),
      _useState2 = _slicedToArray(_useState, 2),
      payload = _useState2[0],
      setPayload = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      shouldFetch = _useState4[0],
      setShouldFetch = _useState4[1];

  var stringifyPayload = JSON.stringify(payload);

  var _useState5 = useState({
    firstTimeFetched: false,
    fetched: false,
    fetching: false,
    response: _payload.initialValue || {}
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      data = _useState6[0],
      setData = _useState6[1];

  var firstTimeFetched = data.firstTimeFetched;
  var controller = new AbortController();
  var signal = controller.signal;
  var endpoint = payload.endpoint,
      params = payload.params,
      payloadOnSuccess = payload.onSuccess,
      payloadOnError = payload.onError,
      payloadPushNotification = payload.pushNotification;
  var onSuccess = useCallback(function (response) {
    var pushNotification = takeUndefinedAsTrue(payloadPushNotification);
    if (payloadOnSuccess) payloadOnSuccess(response);
    decrease();
    setData(function (oldData) {
      return _objectSpread2(_objectSpread2({}, oldData), {}, {
        response: response,
        fetching: false,
        fetched: true,
        firstTimeFetched: true
      });
    });

    if (response.message && pushNotification) {
      pushInfoNotification({
        title: "Bildirim!",
        message: response.message
      });
    }
  }, [payloadPushNotification, payloadOnSuccess]);
  var onError = useCallback(function (response) {
    var responseJSON = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var pushNotification = takeUndefinedAsTrue(payloadPushNotification);
    var notificationObj = {};
    pushErrorNotification({
      title: "Hata!",
      message: "options = ".concat(endpoint, "\n            response = ").concat(JSON.stringify(response), "\nresponseJSON = ").concat(JSON.stringify(responseJSON), "\n")
    });
    decrease();

    switch (response.status) {
      case 404:
        notificationObj.type = "error";
        notificationObj.message = "Sayfa bulunamadı!";
        break;

      case 403:
        notificationObj.type = "warning";
        notificationObj.message = "Your session has expired!";
        break;

      case 401:
        logout();
        notificationObj.type = "warning";
        notificationObj.message = "Your session has expired!";
        break;

      default:
        notificationObj.type = "error";
        notificationObj.message = "Bilinmeyen hata";
    }

    console.log("[useApi].onError \nresponse", response, "\n responseJSON", responseJSON, "\n notificationObj", notificationObj, payload);

    if (pushNotification) {
      if (response.message || responseJSON.message || notificationObj.message) {
        pushErrorNotification({
          title: "Hata!",
          message: response.message || responseJSON.message || notificationObj.message
        });
      }
    }

    setData(function (oldData) {
      return _objectSpread2(_objectSpread2({}, oldData), {}, {
        response: _objectSpread2({}, responseJSON || response),
        fetching: false,
        fetched: true,
        firstTimeFetched: true
      });
    });
    if (payloadOnError) payloadOnError(responseJSON || response);
  }, [endpoint, payloadPushNotification, payloadOnError]);
  useEffect(function () {
    var initial = payload.initial;
    if (initial) load();
  }, [stringifyPayload]);
  var updatePayload = useCallback(function (__payload) {
    setPayload(function (oldPayload) {
      var newPayload = _objectSpread2(_objectSpread2({}, oldPayload), __payload);

      var _showLoading = newPayload.showLoading;
      var showLoading = takeUndefinedAsTrue(_showLoading);

      if (!newPayload.method && !newPayload.params) {
        newPayload.method = "GET";
      }

      if (newPayload.method !== "GET" && showLoading) {
        increase();
      }

      return newPayload;
    });
  }, []);
  var updateData = useCallback(function () {
    setData(function (oldData) {
      return _objectSpread2(_objectSpread2({}, oldData), {}, {
        fetching: true,
        fetched: false
      });
    });
  }, []);
  var load = useCallback(function () {
    var __payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    updatePayload(__payload);
    updateData();
    setShouldFetch(true);
  }, []);
  useEffect(function () {
    if (shouldFetch) {
      iFetch(_objectSpread2(_objectSpread2({}, payload), {}, {
        params: params,
        onSuccess: onSuccess,
        onError: onError,
        token: token,
        signal: signal
      }));
      setShouldFetch(false);
    }
  }, [onError, onSuccess, params, shouldFetch, token]);
  useEffect(function () {
    return function () {
      controller.abort();
    };
  }, []);
  return _objectSpread2({
    load: load
  }, data);
};

var widths = [576, 768, 992, 1200, 1600];
var sizes = ["xs", "sm", "md", "lg", "xl", "xxl"];

var getSizeOfWindowWidth = function getSizeOfWindowWidth(width) {
  var indexOfWidth = findLastIndex(widths, function (c) {
    return width >= c;
  });
  return sizes[takeIf(indexOfWidth > -1, indexOfWidth, 0)];
};

var useDimensions = function useDimensions(payload) {
  var _useState = useState({
    width: 0,
    height: 0,
    size: "xs"
  }),
      _useState2 = _slicedToArray(_useState, 2),
      dimensions = _useState2[0],
      setDimensions = _useState2[1];

  var updateDimensions = useCallback(function (width, height) {
    setDimensions(function (oldDimensions) {
      var newDimensions = _objectSpread2({}, oldDimensions);

      newDimensions.width = width;
      newDimensions.height = height;
      newDimensions.size = getSizeOfWindowWidth(width);
      return newDimensions;
    });
  }, []);
  var getCurrentAndRequestedSizeIndex = useCallback(function (_size) {
    var size = dimensions.size;
    var indexOfCurrentSize = sizes.indexOf(size);
    var indexOfSize = sizes.indexOf(_size);
    return [indexOfCurrentSize, indexOfSize];
  }, [dimensions]);
  var isSizeEqualOrLargerThan = useCallback(function (_size) {
    var _getCurrentAndRequest = getCurrentAndRequestedSizeIndex(_size),
        _getCurrentAndRequest2 = _slicedToArray(_getCurrentAndRequest, 2),
        indexOfCurrentSize = _getCurrentAndRequest2[0],
        indexOfSize = _getCurrentAndRequest2[1];

    return indexOfCurrentSize >= indexOfSize;
  }, [getCurrentAndRequestedSizeIndex]);
  var isSizeLargerThan = useCallback(function (_size) {
    var _getCurrentAndRequest3 = getCurrentAndRequestedSizeIndex(_size),
        _getCurrentAndRequest4 = _slicedToArray(_getCurrentAndRequest3, 2),
        indexOfCurrentSize = _getCurrentAndRequest4[0],
        indexOfSize = _getCurrentAndRequest4[1];

    return indexOfCurrentSize > indexOfSize;
  }, [getCurrentAndRequestedSizeIndex]);
  var isSizeEqualTo = useCallback(function (_size) {
    var _getCurrentAndRequest5 = getCurrentAndRequestedSizeIndex(_size),
        _getCurrentAndRequest6 = _slicedToArray(_getCurrentAndRequest5, 2),
        indexOfCurrentSize = _getCurrentAndRequest6[0],
        indexOfSize = _getCurrentAndRequest6[1];

    return indexOfCurrentSize === indexOfSize;
  }, [getCurrentAndRequestedSizeIndex]);
  var isSizeSmallerThan = useCallback(function (_size) {
    var _getCurrentAndRequest7 = getCurrentAndRequestedSizeIndex(_size),
        _getCurrentAndRequest8 = _slicedToArray(_getCurrentAndRequest7, 2),
        indexOfCurrentSize = _getCurrentAndRequest8[0],
        indexOfSize = _getCurrentAndRequest8[1];

    return indexOfCurrentSize < indexOfSize;
  }, [getCurrentAndRequestedSizeIndex]);
  var isSizeEqualOrSmallerThan = useCallback(function (_size) {
    var _getCurrentAndRequest9 = getCurrentAndRequestedSizeIndex(_size),
        _getCurrentAndRequest10 = _slicedToArray(_getCurrentAndRequest9, 2),
        indexOfCurrentSize = _getCurrentAndRequest10[0],
        indexOfSize = _getCurrentAndRequest10[1];

    return indexOfCurrentSize <= indexOfSize;
  }, [getCurrentAndRequestedSizeIndex]);
  var onResize = useCallback(function (_window) {
    var innerWidth = _window.innerWidth,
        innerHeight = _window.innerHeight;
    updateDimensions(innerWidth, innerHeight);
  }, [updateDimensions]);
  useEffect(function () {
    onResize(window);
    var oldOnResize = window.onresize;

    window.onresize = function (e) {
      onResize(e.target);
      if (oldOnResize) oldOnResize(e);
    };
  }, [onResize]);
  return _objectSpread2(_objectSpread2({}, dimensions), {}, {
    isSizeEqualOrLargerThan: isSizeEqualOrLargerThan,
    isSizeLargerThan: isSizeLargerThan,
    isSizeEqualTo: isSizeEqualTo,
    isSizeSmallerThan: isSizeSmallerThan,
    isSizeEqualOrSmallerThan: isSizeEqualOrSmallerThan
  });
};

var useHistory = useHistory$1;

var useRoute = function useRoute(params) {
  var _getRoutes = getRoutes(),
      publicRoutes = _getRoutes.publicRoutes,
      authorizedRoutes = _getRoutes.authorizedRoutes;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      publicRouterRoutes = _useState2[0],
      setPublicRouterRoutes = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      authorizedRouterRoutes = _useState4[0],
      setAuthorizedRouterRoutes = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      currentRouterRoutes = _useState6[0],
      setCurrentRouterRoutes = _useState6[1];

  var _useAuth = useAuth(),
      isLoggedIn = _useAuth.isLoggedIn;

  var getAuthorizedRouterRoutes = useCallback(function () {
    return authorizedRoutes.map(function (route, index) {
      var _exact = route.exact,
          path = route.path,
          component = route.component,
          rest = _objectWithoutProperties(route, ["exact", "path", "component"]);

      var exact = takeUndefinedAsTrue(_exact);
      return /*#__PURE__*/React.createElement(Route, _extends({
        exact: exact,
        path: path,
        component: component,
        key: index
      }, rest));
    });
  }, [authorizedRoutes]);
  var getPublicRouterRoutes = useCallback(function () {
    return publicRoutes.map(function (route, index) {
      var _exact = route.exact,
          path = route.path,
          component = route.component,
          rest = _objectWithoutProperties(route, ["exact", "path", "component"]);

      var exact = takeUndefinedAsTrue(_exact);
      return /*#__PURE__*/React.createElement(Route, _extends({
        exact: exact,
        path: path,
        component: component,
        key: index
      }, rest));
    });
  }, [publicRoutes]);
  useEffect(function () {
    if (isLoggedIn) setCurrentRouterRoutes(authorizedRouterRoutes);else setCurrentRouterRoutes(publicRouterRoutes);
  }, [isLoggedIn, authorizedRouterRoutes, publicRouterRoutes]);
  useEffect(function () {
    setAuthorizedRouterRoutes(getAuthorizedRouterRoutes());
    setPublicRouterRoutes(getPublicRouterRoutes());
  }, [getAuthorizedRouterRoutes, getPublicRouterRoutes]);
  return {
    publicRouterRoutes: publicRouterRoutes,
    authorizedRouterRoutes: authorizedRouterRoutes,
    currentRouterRoutes: currentRouterRoutes
  };
};

var useSocket = function useSocket() {
  var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _useAuth = useAuth(),
      username = _useAuth.username;

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      socket = _useState2[0],
      setSocket = _useState2[1];

  var onopen = payload.onopen,
      onclose = payload.onclose,
      onerror = payload.onerror,
      onmessage = payload.onmessage;
  var connect = useCallback(function () {
    var readyState = socket.readyState;
    if (readyState === WebSocket.OPEN || readyState === WebSocket.CONNECTING) return;
    var host = process.env.REACT_APP_PROXY_HOST;
    var protocol = process.env.REACT_APP_USE_SSL === "1" ? "wss" : "ws";

    var _socket = new WebSocket("".concat(protocol, "://").concat(host, "/ws?username=").concat(username));

    setSocket(_socket);
  }, [username, socket]);
  useEffect(function () {
    connect();
  }, [connect]);
  useEffect(function () {
    if (socket) {
      socket.onopen = function (e) {
        if (onopen) onopen(e);
      };

      socket.onmessage = function (event) {
        var _data = event.data;
        var data = _data;

        try {
          data = JSON.parse(data);
        } catch (e) {
          console.error("JSON PARSE error", e);
        }

        onmessage(data); //console.log(`[message] Data received from server`, data, _data);
      };

      socket.onclose = function (event) {
        if (onclose) onclose(event);

        if (event.wasClean) ;
      };

      socket.onerror = function (error) {
        if (onerror) onerror(error);
      };
    }
  }, [onclose, onerror, onmessage, onopen, socket]);
  useEffect(function () {
    return function () {
      if (socket.close) socket.close(1000, "User disconnected!");
    };
  }, [socket]);
  return {
    connect: connect,
    socket: socket
  };
};

var history = createBrowserHistory();

var AppWrapper = function AppWrapper(props) {
  var userLoadOptions = props.userLoadOptions,
      publicLayout = props.publicLayout,
      authorizedLayout = props.authorizedLayout,
      checkingRenderer = props.checkingRenderer;

  var _useAuth = useAuth(),
      isLoggedIn = _useAuth.isLoggedIn,
      checked = _useAuth.checked,
      logout = _useAuth.logout,
      login = _useAuth.login,
      token = _useAuth.token,
      setToken = _useAuth.setToken;

  var _useLocalStorage = useLocalStorage("token"),
      getLocalToken = _useLocalStorage.getItem,
      removeToken = _useLocalStorage.removeItem;

  var _useApi = useApi(),
      fetched = _useApi.fetched,
      fetching = _useApi.fetching,
      load = _useApi.load;

  var localToken = getLocalToken();
  useEffect(function () {
    if (localToken) {
      if (token) {
        if (!fetching && !fetched) {
          load(_objectSpread2(_objectSpread2({}, userLoadOptions), {}, {
            onSuccess: function onSuccess(response) {
              if (response.data) {
                login(response.data);
              } else {
                logout();
              }
            },
            onError: function onError() {
              removeToken();
              logout();
            }
          }));
        }
      } else {
        setToken(localToken);
      }
    } else {
      logout();
    }
  }, [localToken, removeToken, fetching, load, fetched, login, logout, token, setToken]);

  if (!checked || localToken && !fetched) {
    if (checkingRenderer) return /*#__PURE__*/React.createElement(props.checkingRenderer, null);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100vh"
      },
      className: "center"
    }, "Y\xFCkleniyor...");
  } else if (isLoggedIn) {
    return /*#__PURE__*/React.createElement(AppRouter, {
      layout: authorizedLayout
    });
  } else {
    return /*#__PURE__*/React.createElement(AppPublicRouter, {
      layout: publicLayout
    });
  }
};

var AppPublicRouter = function AppPublicRouter(props) {
  return /*#__PURE__*/React.createElement(BrowserRouter, {
    history: history
  }, /*#__PURE__*/React.createElement(props.layout, null, /*#__PURE__*/React.createElement(AppPublicRoutesRenderer, null)));
};

var AppPublicRoutesRenderer = function AppPublicRoutesRenderer(props) {
  var _useRoute = useRoute(),
      publicRouterRoutes = _useRoute.publicRouterRoutes;

  return /*#__PURE__*/React.createElement(Switch, null, publicRouterRoutes);
};

var AppRouter = function AppRouter(props) {
  return /*#__PURE__*/React.createElement(BrowserRouter, {
    history: history
  }, /*#__PURE__*/React.createElement(props.layout, null, /*#__PURE__*/React.createElement(AppRoutesRenderer, null)));
};

var AppRoutesRenderer = function AppRoutesRenderer() {
  var _useRoute2 = useRoute(),
      authorizedRouterRoutes = _useRoute2.authorizedRouterRoutes;

  return /*#__PURE__*/React.createElement(Switch, null, authorizedRouterRoutes);
};

export { AppWrapper, ArrayToJSON, EnumToArray, JSONArrayIndexOf, JSONToArray, Locales, StoreContext, StoreProvider, actions, bytesToSize, changeColor, coalasce, combineReducers, constants, cos, dateToDescription, deepCopy, deleteElementFromArrayByKey, destructArray, download, downloadByDataURL, downloadQRCodeById, downloadQRCodeBySVGElement, findLastIndex, formatDate, generatedColorFromString, getAddressText, getAppNames, getAppURL$1 as getAppURL, getAppURLs, getCurrentURL, getDangerColor, getDatesOfYear, getFirstLetters, getLocale, getMainColor, getMonthDescription, getRoutes, getSuccessColor, getTodayMonth, getTodayYear, getUriFromImageObject, guid, hashCode, iFetch, insertOrUpdateElementInArrayByKey, isArrayContains, isArrayEmpty, isJSONEmpty, isNullOrUndefined, monthsNumberArray, numberShouldStartWithZero, setAppNames, setAppURLs, setDangerColor, setDefaultLocale, setMainColor, setRoutes, setSuccessColor, spliceString, sum, takeIf, takeUndefinedAsTrue, transformObj, updateLocales, updateObjectByName, useApi, useAuth, useDimensions, useHistory, useLocalStorage, useRoute, useSocket };
