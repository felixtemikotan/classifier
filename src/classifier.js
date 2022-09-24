function classifier(input) {
    if (!Array.isArray(input)) {
        throw Error;
    }
    if (!input.length) {
        return { noOfGroups: 0 };
    }

    const modifiedArray = input.map((element) => ({
        name: element.name,
        age: (Date(2019, 0, 1).getFullYear() - new Date(element.dob).getFullYear()),
        regNo: element.regNo,
        dob: element.dob,
    })).sort(function(val1, val2) {
        return val1.age - val2.age;
    });

    let group = [modifiedArray[0]];
    let studentGroup = [];

    for (let count = 1; count < modifiedArray.length; count++) {
        if (modifiedArray[count].age - group[0].age <= 5 && group.length <= 2) {
            group.push(modifiedArray[count]);
        } else {
            studentGroup.push(group);
            group = [];
            group.push(modifiedArray[count]);
        }
    }

    if (group.length) {
        studentGroup.push(group);
    }

    let finalResult = {};
    finalResult.noOfGroups = studentGroup.length;

    const result = studentGroup.map(function(group) {
        return {
            members: group.map((element) => ({
                name: element.name,
                age: element.age,
                dob: element.dob,
                regNo: element.regNo,
            })),
            oldest: group[group.length - 1].age,
            sum: group.reduce((accumulator, element) => {
                return accumulator + element.age;
            }, 0),
            regNos: group.map(el => (Number(el.regNo))).sort(function(valA, valB) {
                return valA - valB
            })
        };
    });

    result.forEach((group, indexOfGroup) => {
        let currentGroup = `group${indexOfGroup + 1}`;
        finalResult = {...finalResult, [currentGroup]: group };
    });

    return finalResult;
}

export default classifier;