Feature: Get Currency Rates Feature
	As an API user
	I want to get currency rates for a base currency
	So I can do accurate currency exchange

	Scenario: Default base currency should be EUR and default date should be today
		When I request all exchange rates
		Then I should get EUR as the base currency
		And rates should be for today
		And api should respond with correct message structure

	Scenario: I should be able to set a different base currency
		Given I want GBP as the base currency
		When I request all exchange rates
		Then I should get GBP as the base currency
		And rates should be for today
		And api should respond with correct message structure

	Scenario: I should be able to set a different exchange day
		Given I want to see rates for 2016-05-03
		When I request all exchange rates
		Then I should get EUR as the base currency
		And rates should be for 2016-05-03
		And api should respond with correct message structure

	Scenario: I should be able to set a base currency and exchange day
		Given I want GBP as the base currency
		And I want to see rates for 2016-05-10
		When I request all exchange rates
		Then I should get GBP as the base currency
		And rates should be for 2016-05-10
		And api should respond with correct message structure
