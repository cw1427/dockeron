import _ from 'lodash'

export const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]))
}

export const forEach = (arr, fn) => {
    if (!arr.length || !fn) return
    let i = -1
    let len = arr.length
    while (++i < len) {
        let item = arr[i]
        fn(item, i, arr)
    }
}

export const getRouterObjByName = (parent, routers, name) => {
    if (!name || !routers || !routers.length) {
        return null;
    }
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            let clone = Object.assign({ parent: parent }, item)
            return clone;
        }
        routerObj = getRouterObjByName(item, item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
}

export const hasOneOf = (target, arr) => {
    return target.some(_ => arr.indexOf(_) > -1)
}

export const hasChild = (item) => {
    return item.children && item.children.length !== 0
}

export const showThisMenuEle = (item, access) => {
    if (item.meta && item.meta.access && item.meta.access.length) {
        if (hasOneOf(item.meta.access, access)) return true
        else return false
    } else return true
}

    /**
     * @param {Array} list get all the menu list from the router
     * @returns {Array}
     */
export const getMenuByRouter = (list, access) => {
    let res = []
    forEach(list, item => {
        if (item.meta && !item.meta.hideInMenu) {
            let obj = {
                icon: (item.meta && item.meta.icon) || '',
                name: item.name,
                meta: item.meta
            }
            if (hasChild(item) && showThisMenuEle(item, access)) {
                obj.children = getMenuByRouter(item.children, access)
            }
            if (showThisMenuEle(item, access)) res.push(obj)
        }
    })
    return res
}

export const getOpenMenuByRouter = (list, access) => {
    let res = []
    forEach(list, item => {
        if (item.meta && !item.meta.hideInMenu) {
            let obj = item.name
            let children = []
            if (hasChild(item) && showThisMenuEle(item, access)) {
                children = getMenuByRouter(item.children, access)
            }
            if (showThisMenuEle(item, access) && children.length >=1) res.push(obj)
        }
    })
    return res
}

/**
 * @param {Array} routeMetched metched current route
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched) => {
    let res = routeMetched.filter(item => {
        return item.meta === undefined || !item.meta.hide
    }).map(item => {
        let obj = {
            icon: (item.meta && item.meta.icon) || '',
            name: item.name,
            meta: item.meta
        }
        return obj
    })
    res = res.filter(item => {
        return !item.meta.hideInMenu
    })
    return [{
        name: 'Home',
        icon: 'ios-home',
        to: '/'
    }, ...res]
}

export const showTitle = (item, vm) => (item.meta && item.meta.title) || item.name

/**
 * @param {Array} routers
 * @description find the home route
 */
export const getHomeRoute = routers => {
    let i = -1
    if (routers == null) return {}
    let len = routers.length
    let homeRoute = {}
    while (++i < len) {
        let item = routers[i]
        if (item.children && item.children.length) {
            let res = getHomeRoute(item.children)
            if (res.name) return res
        } else {
            if (item.name === 'home') homeRoute = item
        }
    }
    return homeRoute
}

/**
 * @param {*} access Check user access permission: ['super_admin', 'admin']
 * @param {*} route
 */
const hasAccess = (access, route) => {
    if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
    else return true
}

/**
 * @param {*} name to route name
 * @param {*} access use access group
 * @param {*} routes Vue router obj
 * @description check if user have access permission for {to}
 */
export const canTurnTo = (name, access, routes) => {

    let route = getRouterObjByName(null, routes, name)
    const checkHasAccessRoutenames = (route) => {
        if (route.parent && route.parent != null) {
            if (!checkHasAccessRoutenames(route.parent)) return false
        }
        if (route.meta && route.meta.access) {
            if (!hasAccess(access, route)) return false
        }
        return true
    }
    return checkHasAccessRoutenames(route)
}

/**
 * @param {String} url
 * @description get params from url
 */
export const getParams = url => {
    const keyValueArr = url.split('?')[1].split('&')
    let paramObj = {}
    keyValueArr.forEach(item => {
        const keyValue = item.split('=')
        paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
}

/**
 * @param {Number} times execute times
 * @param {Function} callback callback function
 */
export const doCustomTimes = (times, callback) => {
    let i = -1
    while (++i < times) {
        callback()
    }
}


export const findNodeUpper = (ele, tag) => {
    if (ele.parentNode) {
        if (ele.parentNode.tagName === tag.toUpperCase()) {
            return ele.parentNode
        } else {
            return findNodeUpper(ele.parentNode, tag)
        }
    }
}

export const findNodeDownward = (ele, tag) => {
    const tagName = tag.toUpperCase()
    if (ele.childNodes.length) {
        let i = -1
        let len = ele.childNodes.length
        while (++i < len) {
            let child = ele.childNodes[i]
            if (child.tagName === tagName) return child
            else return findNodeDownward(child, tag)
        }
    }
}

export const showByAccess = (access, canViewAccess) => {
    return hasOneOf(canViewAccess, access)
}

export const isEmptyObject = (e) => {
    var t;
    for (t in e)
        return !1;
    return !0
}

export const isNestEmptyObj = (o) => {
    let result = true
    if (_.isArray(o)){
        _.each(o, (v)=>{
            if (_.isObject(v)){
                result = result && _.isNil(v)
            }else{
                result = result && _.isEmpty(v)
            }

        })
    }else if (_.isObject){
        _.mapKeys(o, (v,k)=>{
            if (_.isObject(v) || _.isArray(v)) {
                result = result && isNestEmptyObj(v)
            }else {
                result = result && _.isEmpty(v)
            }
        })
    }
    else {
        result =result && _.isEmpty(o)
    }
    return result
}
