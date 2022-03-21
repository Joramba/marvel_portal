"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = require("../hooks/http.hook");

var useMarvelService = function useMarvelService() {
  var _useHttp = (0, _http.useHttp)(),
      loading = _useHttp.loading,
      request = _useHttp.request,
      error = _useHttp.error,
      clearError = _useHttp.clearError;

  var _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  var _apiKey = 'apikey=b10c59979fb4c72897ade3b42ced8aec';
  var _baseOffSet = 210;

  var getAllCharacters = function getAllCharacters() {
    var offset,
        res,
        _args = arguments;
    return regeneratorRuntime.async(function getAllCharacters$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            offset = _args.length > 0 && _args[0] !== undefined ? _args[0] : _baseOffSet;
            _context.next = 3;
            return regeneratorRuntime.awrap(request("".concat(_apiBase, "characters?limit=9&offset=").concat(offset, "&").concat(_apiKey)));

          case 3:
            res = _context.sent;
            return _context.abrupt("return", res.data.results.map(_transformCharacter));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  var getCharacter = function getCharacter(id) {
    var res;
    return regeneratorRuntime.async(function getCharacter$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(request("".concat(_apiBase, "characters/").concat(id, "?").concat(_apiKey)));

          case 2:
            res = _context2.sent;
            return _context2.abrupt("return", _transformCharacter(res.data.results[0]));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  var getComics = function getComics() {
    var offset,
        res,
        _args3 = arguments;
    return regeneratorRuntime.async(function getComics$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            offset = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : _baseOffSet;
            _context3.next = 3;
            return regeneratorRuntime.awrap(request("".concat(_apiBase, "comics?limit=8&offset=").concat(offset, "&").concat(_apiKey)));

          case 3:
            res = _context3.sent;
            return _context3.abrupt("return", res.data.results.map(_transformComics));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  };

  var getComic = function getComic(id) {
    var res;
    return regeneratorRuntime.async(function getComic$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(request("".concat(_apiBase, "comics/").concat(id, "?").concat(_apiKey)));

          case 2:
            res = _context4.sent;
            return _context4.abrupt("return", _transformComics(res.data.results[0]));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  };

  var _transformCharacter = function _transformCharacter(_char) {
    return {
      id: _char.id,
      name: _char.name,
      description: _char.description ? "".concat(_char.description.slice(0, 210), "...") : 'There is no description for this character',
      thumbnail: _char.thumbnail.path + '.' + _char.thumbnail.extension,
      homepage: _char.urls[0].url,
      wiki: _char.urls[1].url,
      comics: _char.comics.items
    };
  };

  var _transformComics = function _transformComics(comics) {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount ? "".concat(comics.pageCount, " p.") : 'No information about the number of pages',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects.language || 'en-us',
      price: comics.prices.price ? "".concat(comics.prices.price, "$") : 'not available'
    };
  };

  return {
    loading: loading,
    error: error,
    getAllCharacters: getAllCharacters,
    getCharacter: getCharacter,
    getComics: getComics,
    clearError: clearError,
    getComic: getComic
  };
};

var _default = useMarvelService; // import {useHttp} from '../hooks/http.hook';
// const useMarvelService = () => {
//     const {loading, request, error, clearError} = useHttp();
//     const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
//     // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
//     const _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62';
//     const _baseOffset = 210;
//     const getAllCharacters = async (offset = _baseOffset) => {
//         const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
//         return res.data.results.map(_transformCharacter);
//     }
//     const getCharacter = async (id) => {
//         const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
//         return _transformCharacter(res.data.results[0]);
//     }
//     const getAllComics = async (offset = 0) => {
//         const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
//         return res.data.results.map(_transformComics);
//     }
//     const getComics = async (id) => {
//         const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
//         return _transformComics(res.data.results[0]);
//     }
//     const _transformCharacter = (char) => {
//         return {
//             id: char.id,
//             name: char.name,
//             description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
//             thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
//             homepage: char.urls[0].url,
//             wiki: char.urls[1].url,
//             comics: char.comics.items
//         }
//     }
//     const _transformComics = (comics) => {
//         return {
//             id: comics.id,
//             title: comics.title,
//             description: comics.description || 'There is no description',
//             pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
//             thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
//             language: comics.textObjects.language || 'en-us',
//             price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
//         }
//     }
//     return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComics}
// }
// export default useMarvelService;

exports["default"] = _default;