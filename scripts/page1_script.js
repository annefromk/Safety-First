let selectedForDemographic = {}
const criminal_data = [[6, 24], [20, 129], [20, 264], [57, 1237], [130, 3867],
                       [56, 940], [41, 449], [24, 282], [10, 88]]

$('#question-age').hide()

const showQuestion = (type) => {
  if (type === 'age') {
    $('#question-gender').hide()
    $('#question-age').show()
    $(`.selector-item[value="${ selectedInfo.age }"]`).addClass('selected')
  } else if (type === 'gender'){
    $('#question-age').hide()
    $('#question-gender').show()
    $(`.selector-item[value="${ selectedInfo.gender }"]`).addClass('selected')
  }
}

const styleBreadcomb = (type, value) => {
  if (type === 'age') {
    if (value === 'unstyle') {
      $('#age-bc').text('연령')
      $('#age-bc').css('border', '2px solid #FCAF17')
      $('#age-bc').css('background-color', 'white')
      $('#age-bc').css('color', '#959494')
    } else {
      $('#age-bc').text(value)
      $('#age-bc').css('border', '2px solid #5D81C3')
      $('#age-bc').css('background-color', '#5D81C3')
      $('#age-bc').css('color', 'white')
    }
  } else if (type === 'gender') {
    if (value === 'unstyle') {
      $('#gender-bc').text('성별')
      $('#gender-bc').css('border', '2px solid #FCAF17')
      $('#gender-bc').css('background-color', 'white')
      $('#gender-bc').css('color', '#959494')
    } else {
      $('#gender-bc').text(value)
      $('#gender-bc').css('border', '2px solid #5D81C3')
      $('#gender-bc').css('background-color', '#5D81C3')
      $('#gender-bc').css('color', 'white')
    }
  }
}

const transferValueToIndex = (selectedForDemographic) => {
  result = {}
  if (selectedInfo.gender === '남성') {
    result.gIndex = 0
  } else if (selectedInfo.gender === '여성') {
    result.gIndex = 1
  } else {
    result.gIndex = -1
  }

  if (selectedInfo.age === '6세 이하') {
    result.aIndex = 0
  } else if (selectedInfo.age === '12세 이하') {
    result.aIndex = 1
  } else if (selectedInfo.age === '15세 이하') {
    result.aIndex = 2
  } else if (selectedInfo.age === '20세 이하') {
    result.aIndex = 3
  } else if (selectedInfo.age === '30세 이하') {
    result.aIndex = 4
  } else if (selectedInfo.age === '40세 이하') {
    result.aIndex = 5
  } else if (selectedInfo.age === '50세 이하') {
    result.aIndex = 6
  } else if (selectedInfo.age === '60세 이하') {
    result.aIndex = 7
  } else if (selectedInfo.age === '60세 초과') {
    result.aIndex = 8
  } else {
    result.aIndex = -1
  }

  return result
}

const getVictim = () => {
  const indices = transferValueToIndex(selectedForDemographic)
  console.log(indices)
  g = indices.gIndex
  a = indices.aIndex

  if (g === -1 && a === -1) {
    return 8780
  } else if (g != -1 && a != -1) {
    return criminal_data[a][g]
  }

  if (g === -1) {
    return criminal_data[a].reduce((p1, p2) => {return p1 + p2})
  } else if (a === -1) {
    let result = criminal_data.map(x => x[g])
    return result.reduce((e1, e2) => {return e1 + e2})
  }
}

$('.selector-item').on('click', function(){
  if ($(this).attr('qtype') === 'gender') {
    if ($(this).hasClass('selected')) {
      selectedInfo.gender = undefined
      styleBreadcomb('gender', 'unstyle')
    } else {
      selectedInfo.gender = $(this).attr('value')
      showQuestion('age')
      styleBreadcomb('gender', selectedInfo.gender)
    }
  } else {
    if ($(this).hasClass('selected')) {
      selectedInfo.age = undefined
      styleBreadcomb('age', 'unstyle')
    } else {
      selectedInfo.age = $(this).attr('value')
      showQuestion('gender')
      styleBreadcomb('age', selectedInfo.age)
    }
  }
  $(this).toggleClass('selected')
  $(this).siblings().removeClass('selected')

  $('#victim').text(getVictim())
})

$('.selector-item').hover(function() {
  $(this).addClass('hover')
}, function() {
  $(this).removeClass('hover')
})

$('.navi-none-age').on('click', function() {
  showQuestion('age')
})
$('.navi-none-gender').on('click', function() {
  showQuestion('gender')
})
