import React, {useCallback, useState} from 'react';
import {
  InteractionManager,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from 'react-native';
import {CalendarListType} from 'react-native-calendars';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LoadingView from '@explore/components/LoadingView';
import Typography from '~/components/Typography';
import FilterView from '@explore/components/FilterView';
import NavigationHeader from '@explore/components/NavigationHeader';
import ClearButton from '@explore/components/ClearFilterButton';
import {useSearchFilter} from '@explore/context/filter/Provider';
import {
  ABBREVIATED_DAYS,
  formattedDate,
  getDayDiffCount,
  MONTH_MAPPING,
  normalizeDateNumber,
} from '~/util/date';
import colors from '~/theme/colors';

let ExpansiveCalendarList: CalendarListType;

const styles = StyleSheet.create({
  calendarHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  headerYear: {opacity: 0.5, marginLeft: 8},
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  headerLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  dayText: {
    textAlign: 'center',
    opacity: 0.5,
    width: 32,
  },
});

const markedProperties = {
  color: colors.accent,
  selected: true,
};

interface MarkedDates {
  color: string;
  selected?: boolean;
  startDate?: boolean;
  endDate?: boolean;
}

const formattedNowDate = formattedDate();

function getMarkedPeriod(
  startDate: string,
  endDate: string,
): Record<string, MarkedDates> {
  const dayDiffCount = getDayDiffCount(startDate, endDate);

  const periodDate = new Date(startDate);

  return Array.from({length: dayDiffCount}).reduce<Record<string, MarkedDates>>(
    (result, _, index) => {
      periodDate.setDate(periodDate.getDate() + 1);
      const newDay = periodDate.getDate();

      if (index == 0) {
        return {...result};
      }

      const normalizedDay = normalizeDateNumber(newDay);
      const month = normalizeDateNumber(periodDate.getMonth() + 1);

      const dateString = `${periodDate.getFullYear()}-${month}-${normalizedDay}`;

      return {
        ...result,
        [dateString]: {
          color: '#DDF3F6',
        },
      };
    },
    {},
  );
}

export default function PeriodScreen() {
  const [isReady, setReady] = useState(false);
  const [showHeaderLine, setShowHeaderLine] = useState(false);
  const {period, setPeriod, formattedPeriod} = useSearchFilter();
  const [markedDates, setMarkedDates] = useState({
    [period.checkIn]: {...markedProperties, startDate: true},
    [period.checkOut]: {...markedProperties, endDate: true},
    ...getMarkedPeriod(period.checkIn, period.checkOut),
  });
  const {checkIn, checkOut} = period;

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        // Calendar list is too expansive to load in a synchronous way
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const {CalendarList} = require('react-native-calendars');
        ExpansiveCalendarList = CalendarList;
        setReady(true);
      });

      return () => task.cancel();
    }, []),
  );

  function getMinDate() {
    if (checkIn && !checkOut) {
      return checkIn;
    }

    return formattedNowDate;
  }

  function clear() {
    setPeriod({checkIn: '', checkOut: ''});
    setMarkedDates({});
  }

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    setShowHeaderLine(e.nativeEvent.contentOffset.y > 0);
  }

  function onDayPress(date: string) {
    if ((checkIn && checkOut) || !checkIn) {
      setPeriod({checkIn: date, checkOut: ''});
      setMarkedDates({
        [date]: {
          ...markedProperties,
          startDate: true,
        },
      });
    } else {
      setPeriod({...period, checkOut: date});
      setMarkedDates({
        ...markedDates,
        ...getMarkedPeriod(checkIn, date),
        [date]: {
          ...markedProperties,
          endDate: true,
        },
      });
    }
  }

  function renderHeader(date: Date) {
    return (
      <View style={styles.calendarHeader}>
        <Typography component="text20" color="primary" fontType="medium">
          {MONTH_MAPPING[date.getMonth()]}{' '}
        </Typography>
        <Typography component="text16" style={styles.headerYear}>
          {date.getFullYear()}
        </Typography>
      </View>
    );
  }

  return (
    <>
      <NavigationHeader
        title={formattedPeriod || 'Period'}
        action={
          <If condition={!!period.checkIn}>
            <ClearButton onPress={clear} />
          </If>
        }>
        <View style={[styles.daysHeader, showHeaderLine && styles.headerLine]}>
          {ABBREVIATED_DAYS.map(day => (
            <Typography
              component="text14"
              key={day}
              color="primary"
              style={styles.dayText}>
              {day}
            </Typography>
          ))}
        </View>
      </NavigationHeader>
      <FilterView onSubmit={navigation.goBack}>
        <Choose>
          <When condition={isReady}>
            <ExpansiveCalendarList
              hideArrows
              hideExtraDays
              scrollEnabled
              showScrollIndicator
              hideDayNames
              onDayPress={({dateString}) => onDayPress(dateString)}
              markingType={'period'}
              minDate={getMinDate()}
              renderHeader={renderHeader}
              onScroll={onScroll}
              markedDates={markedDates}
              calendarHeight={310}
              futureScrollRange={12}
              pastScrollRange={0}
              theme={{
                dayTextColor: colors.primary,
                todayTextColor: colors.primary,
                textDayFontSize: 16,
                textDayFontWeight: '600',
                textDisabledColor: `${colors.primary}20`,
                'stylesheet.day.period': {
                  base: {
                    overflow: 'hidden',
                  },
                },
              }}
            />
          </When>
          <Otherwise>
            <LoadingView />
          </Otherwise>
        </Choose>
      </FilterView>
    </>
  );
}
