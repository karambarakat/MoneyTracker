const path = require('path')
const shx = require('shelljs')

exports.test_if_tf_files_exist = function (val) {
  const dir = path.resolve('./', val)
  if (!shx.test('-d', dir)) {
    throw new Error("--dir either doesn't exists or not a valid directory")
  }

  if (!shx.ls(dir).some((path) => path.includes('.tf'))) {
    throw new Error('there is no any .tf files in ' + dir)
  }
}
