var CommonHelper = require(_pathconst.FilesPath.CommonHelper);
var Config = require(_pathconst.FilesPath.ConfigUrl);

const get = (whereData, whereNotData, columns, filters, isCount, limit, loggedInUser, isFilterByLoggedIn, whereInObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { search, selectedPageSize, currentPage } = filters;


      let user = await knexSqlDb('users as u')
        .modify((knexQuery) => {
          if (isFilterByLoggedIn) {
            knexQuery.where({ "u.is_deleted": 0 })
          } else {
            knexQuery.where({ "is_deleted": 0 })
          }
          if (whereData) {
            knexQuery.andWhere(whereData)
          }
          if (whereNotData) {
            knexQuery.whereNotNull(whereNotData)
          }
          if (isCount) {
            knexQuery.count("* as count")
          } else if (columns) {
            knexQuery.select(columns)
          } else {
            knexQuery.select([
              knexSqlDb.raw('bin_to_uuid(u.user_id) as user_id'),
              'u.mobile', 'u.email', 'u.user_fname', 'u.user_lname', 'u.photo', 'u.user_code'])
          }
          if (currentPage) {
            knexQuery.offset((currentPage - 1) * selectedPageSize)
          }
          if (selectedPageSize) {
            knexQuery.limit(selectedPageSize)
          }
          if (whereInObject && Object.keys(whereInObject)) {
            knexQuery.whereIn(Object.keys(whereInObject)[0], Object.values(whereInObject)[0])
          }
          if (search) {
            knexQuery.andWhere(qb => {
              qb.orWhere(knexSqlDb.raw(`concat(user_fname,' ',user_lname) like concat('%','${search}','%')`))
              qb.orWhere("email", "like", `%${search}%`)
              qb.orWhere("mobile", "like", `%${search}%`)
              qb.orWhere("user_fname", "like", `%${search}%`)
              if (CommonHelper.isUuid(search)) {
                qb.orWhere("user_id", knexSqlDb.raw(`uuid_to_bin('${search}')`))
              }
            })
          }
          if (limit) {
            knexQuery.limit(limit);
          }
          if (isFilterByLoggedIn) {
            var { type, user_type, user_id } = loggedInUser;
            var userRole = Config.roles[type];

            if (user_id) {
              //Is Filter By LoggedIn then send columns like u.username
              knexQuery.leftJoin("ps_student_cases as psc", "psc.user_id ", "u.user_id")

              if (userRole === "Head Coach") {
                knexQuery.where(qb => {

                  qb.where(`psc.head_coach`, user_id)
                  qb.orWhere(`psc.assistant_head_coach`, user_id)
                })
              }
              if (userRole === "Sales POC") {
                knexQuery.where(`psc.sales_poc`, user_id)
              }
              if (userRole === "KAM") {
                knexQuery.where(`psc.kam`, user_id)
              }
            }
          }
        });
      resolve(user)
    } catch (err) {
      reject(err);
    }
  });
};

const insert = async (business_units) => {
  return new Promise(async (resolve, reject) => {
    try {
      let businessUnits = await knexSqlDb('users')
        .insert(business_units);
      resolve(businessUnits)
    } catch (err) {
      reject(err);
    }
  });
}


const update = (data, whereData, whereInColumn, whereInIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await knexSqlDb('users')
        .update(data)
        .modify(knexQuery => {
          if (whereData) {
            knexQuery.where(whereData)
          }
          if (whereInColumn && whereInIds && whereInIds.length) {
            knexQuery.whereIn(whereInColumn, whereInIds)
          }
        });
      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
};

const deleteRecord = (whereData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await knexSqlDb('users').where(whereData).del()
      resolve(user)
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  get,
  update,
  insert,
  deleteRecord
};
