/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./context/ThemeContext.js":
/*!*********************************!*\
  !*** ./context/ThemeContext.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider),\n/* harmony export */   useTheme: () => (/* binding */ useTheme)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n// context/ThemeContext.js\n\n\nconst ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({\n    theme: \"dark\",\n    toggleTheme: ()=>{}\n});\nfunction ThemeProvider({ children }) {\n    const [theme, setTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"dark\");\n    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    // On mount, read from localStorage\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const saved = localStorage.getItem(\"CodePromix-theme\");\n        if (saved === \"light\" || saved === \"dark\") {\n            setTheme(saved);\n        } else {\n            // Default to system preference\n            const prefersDark = window.matchMedia(\"(prefers-color-scheme: dark)\").matches;\n            setTheme(prefersDark ? \"dark\" : \"light\");\n        }\n        setMounted(true);\n    }, []);\n    // Apply theme to <html> and save to localStorage\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!mounted) return;\n        document.documentElement.setAttribute(\"data-theme\", theme);\n        localStorage.setItem(\"CodePromix-theme\", theme);\n    }, [\n        theme,\n        mounted\n    ]);\n    const toggleTheme = ()=>setTheme((t)=>t === \"dark\" ? \"light\" : \"dark\");\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeContext.Provider, {\n        value: {\n            theme,\n            toggleTheme,\n            mounted\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\laksh\\\\OneDrive\\\\Desktop\\\\Agency-Site\\\\context\\\\ThemeContext.js\",\n        lineNumber: 36,\n        columnNumber: 5\n    }, this);\n}\nconst useTheme = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0L1RoZW1lQ29udGV4dC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwwQkFBMEI7O0FBQzZDO0FBRXZFLE1BQU1JLDZCQUFlSixvREFBYUEsQ0FBQztJQUNqQ0ssT0FBTztJQUNQQyxhQUFhLEtBQU87QUFDdEI7QUFFTyxTQUFTQyxjQUFjLEVBQUVDLFFBQVEsRUFBRTtJQUN4QyxNQUFNLENBQUNILE9BQU9JLFNBQVMsR0FBR04sK0NBQVFBLENBQUM7SUFDbkMsTUFBTSxDQUFDTyxTQUFTQyxXQUFXLEdBQUdSLCtDQUFRQSxDQUFDO0lBRXZDLG1DQUFtQztJQUNuQ0QsZ0RBQVNBLENBQUM7UUFDUixNQUFNVSxRQUFRQyxhQUFhQyxPQUFPLENBQUM7UUFDbkMsSUFBSUYsVUFBVSxXQUFXQSxVQUFVLFFBQVE7WUFDekNILFNBQVNHO1FBQ1gsT0FBTztZQUNMLCtCQUErQjtZQUMvQixNQUFNRyxjQUFjQyxPQUFPQyxVQUFVLENBQUMsZ0NBQWdDQyxPQUFPO1lBQzdFVCxTQUFTTSxjQUFjLFNBQVM7UUFDbEM7UUFDQUosV0FBVztJQUNiLEdBQUcsRUFBRTtJQUVMLGlEQUFpRDtJQUNqRFQsZ0RBQVNBLENBQUM7UUFDUixJQUFJLENBQUNRLFNBQVM7UUFDZFMsU0FBU0MsZUFBZSxDQUFDQyxZQUFZLENBQUMsY0FBY2hCO1FBQ3BEUSxhQUFhUyxPQUFPLENBQUMsb0JBQW9CakI7SUFDM0MsR0FBRztRQUFDQTtRQUFPSztLQUFRO0lBRW5CLE1BQU1KLGNBQWMsSUFBTUcsU0FBU2MsQ0FBQUEsSUFBS0EsTUFBTSxTQUFTLFVBQVU7SUFFakUscUJBQ0UsOERBQUNuQixhQUFhb0IsUUFBUTtRQUFDQyxPQUFPO1lBQUVwQjtZQUFPQztZQUFhSTtRQUFRO2tCQUN6REY7Ozs7OztBQUdQO0FBRU8sTUFBTWtCLFdBQVcsSUFBTXpCLGlEQUFVQSxDQUFDRyxjQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQ29kZVByb21peC1hZ2VuY3ktd2Vic2l0ZS8uL2NvbnRleHQvVGhlbWVDb250ZXh0LmpzPzY2MzYiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gY29udGV4dC9UaGVtZUNvbnRleHQuanNcbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IFRoZW1lQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe1xuICB0aGVtZTogJ2RhcmsnLFxuICB0b2dnbGVUaGVtZTogKCkgPT4ge30sXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIFRoZW1lUHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XG4gIGNvbnN0IFt0aGVtZSwgc2V0VGhlbWVdID0gdXNlU3RhdGUoJ2RhcmsnKTtcbiAgY29uc3QgW21vdW50ZWQsIHNldE1vdW50ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIE9uIG1vdW50LCByZWFkIGZyb20gbG9jYWxTdG9yYWdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnQ29kZVByb21peC10aGVtZScpO1xuICAgIGlmIChzYXZlZCA9PT0gJ2xpZ2h0JyB8fCBzYXZlZCA9PT0gJ2RhcmsnKSB7XG4gICAgICBzZXRUaGVtZShzYXZlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlZmF1bHQgdG8gc3lzdGVtIHByZWZlcmVuY2VcbiAgICAgIGNvbnN0IHByZWZlcnNEYXJrID0gd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzO1xuICAgICAgc2V0VGhlbWUocHJlZmVyc0RhcmsgPyAnZGFyaycgOiAnbGlnaHQnKTtcbiAgICB9XG4gICAgc2V0TW91bnRlZCh0cnVlKTtcbiAgfSwgW10pO1xuXG4gIC8vIEFwcGx5IHRoZW1lIHRvIDxodG1sPiBhbmQgc2F2ZSB0byBsb2NhbFN0b3JhZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW1vdW50ZWQpIHJldHVybjtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgdGhlbWUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdDb2RlUHJvbWl4LXRoZW1lJywgdGhlbWUpO1xuICB9LCBbdGhlbWUsIG1vdW50ZWRdKTtcblxuICBjb25zdCB0b2dnbGVUaGVtZSA9ICgpID0+IHNldFRoZW1lKHQgPT4gdCA9PT0gJ2RhcmsnID8gJ2xpZ2h0JyA6ICdkYXJrJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8VGhlbWVDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IHRoZW1lLCB0b2dnbGVUaGVtZSwgbW91bnRlZCB9fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1RoZW1lQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVRoZW1lID0gKCkgPT4gdXNlQ29udGV4dChUaGVtZUNvbnRleHQpO1xuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJUaGVtZUNvbnRleHQiLCJ0aGVtZSIsInRvZ2dsZVRoZW1lIiwiVGhlbWVQcm92aWRlciIsImNoaWxkcmVuIiwic2V0VGhlbWUiLCJtb3VudGVkIiwic2V0TW91bnRlZCIsInNhdmVkIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInByZWZlcnNEYXJrIiwid2luZG93IiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsInNldEF0dHJpYnV0ZSIsInNldEl0ZW0iLCJ0IiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInVzZVRoZW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./context/ThemeContext.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-toast */ \"react-hot-toast\");\n/* harmony import */ var _context_ThemeContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context/ThemeContext */ \"./context/ThemeContext.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_2__]);\nreact_hot_toast__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// pages/_app.js\n\n\n\n\nfunction ToasterWithTheme() {\n    const { theme } = (0,_context_ThemeContext__WEBPACK_IMPORTED_MODULE_3__.useTheme)();\n    const isDark = theme === \"dark\";\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_hot_toast__WEBPACK_IMPORTED_MODULE_2__.Toaster, {\n        position: \"top-right\",\n        toastOptions: {\n            style: {\n                background: isDark ? \"#181828\" : \"#FFFFFF\",\n                color: isDark ? \"#EDE8DF\" : \"#1A1410\",\n                border: \"1px solid rgba(255,107,0,0.3)\",\n                fontFamily: \"DM Sans, sans-serif\",\n                fontSize: \"0.9rem\",\n                boxShadow: isDark ? \"0 8px 32px rgba(0,0,0,0.5)\" : \"0 8px 32px rgba(0,0,0,0.12)\"\n            },\n            success: {\n                iconTheme: {\n                    primary: \"#FF6B00\",\n                    secondary: isDark ? \"#080810\" : \"#FAF7F2\"\n                }\n            },\n            error: {\n                iconTheme: {\n                    primary: \"#ff5555\",\n                    secondary: isDark ? \"#080810\" : \"#FAF7F2\"\n                }\n            }\n        }\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\laksh\\\\OneDrive\\\\Desktop\\\\Agency-Site\\\\pages\\\\_app.js\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, this);\n}\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_ThemeContext__WEBPACK_IMPORTED_MODULE_3__.ThemeProvider, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\laksh\\\\OneDrive\\\\Desktop\\\\Agency-Site\\\\pages\\\\_app.js\",\n                lineNumber: 33,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ToasterWithTheme, {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\laksh\\\\OneDrive\\\\Desktop\\\\Agency-Site\\\\pages\\\\_app.js\",\n                lineNumber: 34,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\laksh\\\\OneDrive\\\\Desktop\\\\Agency-Site\\\\pages\\\\_app.js\",\n        lineNumber: 32,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxnQkFBZ0I7O0FBQ2U7QUFDdUI7QUFDWTtBQUVsRSxTQUFTSTtJQUNQLE1BQU0sRUFBRUMsS0FBSyxFQUFFLEdBQUdGLCtEQUFRQTtJQUMxQixNQUFNRyxTQUFTRCxVQUFVO0lBQ3pCLHFCQUNFLDhEQUFDTCxvREFBT0E7UUFDTk8sVUFBUztRQUNUQyxjQUFjO1lBQ1pDLE9BQU87Z0JBQ0xDLFlBQVlKLFNBQVMsWUFBWTtnQkFDakNLLE9BQVlMLFNBQVMsWUFBWTtnQkFDakNNLFFBQVk7Z0JBQ1pDLFlBQVk7Z0JBQ1pDLFVBQVk7Z0JBQ1pDLFdBQVlULFNBQ1IsK0JBQ0E7WUFDTjtZQUNBVSxTQUFTO2dCQUFFQyxXQUFXO29CQUFFQyxTQUFTO29CQUFXQyxXQUFXYixTQUFTLFlBQVk7Z0JBQVU7WUFBRTtZQUN4RmMsT0FBUztnQkFBRUgsV0FBVztvQkFBRUMsU0FBUztvQkFBV0MsV0FBV2IsU0FBUyxZQUFZO2dCQUFVO1lBQUU7UUFDMUY7Ozs7OztBQUdOO0FBRWUsU0FBU2UsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNsRCxxQkFDRSw4REFBQ3JCLGdFQUFhQTs7MEJBQ1osOERBQUNvQjtnQkFBVyxHQUFHQyxTQUFTOzs7Ozs7MEJBQ3hCLDhEQUFDbkI7Ozs7Ozs7Ozs7O0FBR1AiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db2RlUHJvbWl4LWFnZW5jeS13ZWJzaXRlLy4vcGFnZXMvX2FwcC5qcz9lMGFkIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL19hcHAuanNcbmltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcbmltcG9ydCB7IFRvYXN0ZXIsIHVzZVRvYXN0ZXIgfSBmcm9tICdyZWFjdC1ob3QtdG9hc3QnO1xuaW1wb3J0IHsgVGhlbWVQcm92aWRlciwgdXNlVGhlbWUgfSBmcm9tICcuLi9jb250ZXh0L1RoZW1lQ29udGV4dCc7XG5cbmZ1bmN0aW9uIFRvYXN0ZXJXaXRoVGhlbWUoKSB7XG4gIGNvbnN0IHsgdGhlbWUgfSA9IHVzZVRoZW1lKCk7XG4gIGNvbnN0IGlzRGFyayA9IHRoZW1lID09PSAnZGFyayc7XG4gIHJldHVybiAoXG4gICAgPFRvYXN0ZXJcbiAgICAgIHBvc2l0aW9uPVwidG9wLXJpZ2h0XCJcbiAgICAgIHRvYXN0T3B0aW9ucz17e1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGJhY2tncm91bmQ6IGlzRGFyayA/ICcjMTgxODI4JyA6ICcjRkZGRkZGJyxcbiAgICAgICAgICBjb2xvcjogICAgICBpc0RhcmsgPyAnI0VERThERicgOiAnIzFBMTQxMCcsXG4gICAgICAgICAgYm9yZGVyOiAgICAgJzFweCBzb2xpZCByZ2JhKDI1NSwxMDcsMCwwLjMpJyxcbiAgICAgICAgICBmb250RmFtaWx5OiAnRE0gU2Fucywgc2Fucy1zZXJpZicsXG4gICAgICAgICAgZm9udFNpemU6ICAgJzAuOXJlbScsXG4gICAgICAgICAgYm94U2hhZG93OiAgaXNEYXJrXG4gICAgICAgICAgICA/ICcwIDhweCAzMnB4IHJnYmEoMCwwLDAsMC41KSdcbiAgICAgICAgICAgIDogJzAgOHB4IDMycHggcmdiYSgwLDAsMCwwLjEyKScsXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IHsgaWNvblRoZW1lOiB7IHByaW1hcnk6ICcjRkY2QjAwJywgc2Vjb25kYXJ5OiBpc0RhcmsgPyAnIzA4MDgxMCcgOiAnI0ZBRjdGMicgfSB9LFxuICAgICAgICBlcnJvcjogICB7IGljb25UaGVtZTogeyBwcmltYXJ5OiAnI2ZmNTU1NScsIHNlY29uZGFyeTogaXNEYXJrID8gJyMwODA4MTAnIDogJyNGQUY3RjInIH0gfSxcbiAgICAgIH19XG4gICAgLz5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICByZXR1cm4gKFxuICAgIDxUaGVtZVByb3ZpZGVyPlxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPFRvYXN0ZXJXaXRoVGhlbWUgLz5cbiAgICA8L1RoZW1lUHJvdmlkZXI+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiVG9hc3RlciIsInVzZVRvYXN0ZXIiLCJUaGVtZVByb3ZpZGVyIiwidXNlVGhlbWUiLCJUb2FzdGVyV2l0aFRoZW1lIiwidGhlbWUiLCJpc0RhcmsiLCJwb3NpdGlvbiIsInRvYXN0T3B0aW9ucyIsInN0eWxlIiwiYmFja2dyb3VuZCIsImNvbG9yIiwiYm9yZGVyIiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiYm94U2hhZG93Iiwic3VjY2VzcyIsImljb25UaGVtZSIsInByaW1hcnkiLCJzZWNvbmRhcnkiLCJlcnJvciIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react-hot-toast":
/*!**********************************!*\
  !*** external "react-hot-toast" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = import("react-hot-toast");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();